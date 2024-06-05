/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';
import { CreateAnnotationDto } from './dto-and-response/create-annotation.dto';
import { CreateAnnotationResponse } from './dto-and-response/create-annotation-response';
import { GetAnnotationsResponse } from './dto-and-response/get-annotations-response';
import { v4 as uuidv4 } from 'uuid';
import { node, relation } from 'cypher-query-builder';
import { AnnotateColumnDto } from './dto-and-response/annotate-column-dto';
import { GetExportResponse } from './dto-and-response/get-export-response';
import { AnnotationResponse } from './dto-and-response/annotate-column-response';
import { ConnectAnnotationsDto } from './dto-and-response/connect-annotations-dto';
import { GetColumnAnnotationsResponse } from './dto-and-response/get-column-annotations-response';

@Injectable()
export class AnnotationService {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createAnnotation(
    createAnnotationDto: CreateAnnotationDto,
  ): Promise<CreateAnnotationResponse> {
    const {
      firebaseUserUID,
      name,
      shortcut,
      description,
      createdAt,
      relatedTo,
    } = createAnnotationDto;

    // Create the new annotation
    const uniqueId = uuidv4();

    const createResult = await this.queryRepository
      .initQuery()
      .createNode('Annotation', 'Annotation', {
        id: uniqueId, // Set the unique ID property
        firebaseUserUID: firebaseUserUID,
        name: name,
        shortcut: shortcut,
        description: description,
        createdAt: createdAt,
      })
      .return('Annotation')
      .run();

    const newAnnotation = createResult[0]['Annotation'];

    if (relatedTo) {
      await this.queryRepository.initQuery().raw`
          MATCH (annotation:Annotation { id: ${newAnnotation.properties.id} }), (relatedAnnotation:Annotation { id: ${relatedTo} })
          CREATE (annotation)-[:RELATED_TO]->(relatedAnnotation)
        `.run();
    }

    const annotationResult = await this.queryRepository
      .initQuery()
      .match([
        node('a1:Annotation', 'Annotation', {
          id: newAnnotation.properties.id,
        }),
      ])
      .optionalMatch([
        node('a1'),
        relation('out', '', 'RELATED_TO*'), // Using '*' to match relationships indefinitely
        node('a2:Annotation'),
      ])
      .return('a1, collect(a2) as relatedToAnnotations')
      .run();

    // Check if there is at least one result
    if (annotationResult.length > 0) {
      const formattedResult = {
        ...annotationResult[0]['a1'].properties,
        relatedToAnnotations: annotationResult[0]['relatedToAnnotations'].map(
          (relatedAnnotation) => relatedAnnotation.properties,
        ),
      };

      return formattedResult;
    }
  }

  async getAnnotations(): Promise<GetAnnotationsResponse[]> {
    const query = `
      MATCH (a1:Annotation)
      OPTIONAL MATCH (a1)-[:RELATED_TO*]->(a2:Annotation)
      RETURN a1, COLLECT(a2) AS related_to
    `;

    const annotations = [];

    const results = await this.queryRepository.initQuery().raw(query).run();

    results.forEach((result) => {
      const annotation = result.a1.properties;
      const relatedAnnotations = result.related_to.map(
        (related) => related.properties,
      );

      // Create the hierarchical graph structure with square brackets
      let graphStructure = `[${annotation.shortcut}]`;
      for (const relatedAnnotation of relatedAnnotations) {
        graphStructure += ` -> [${relatedAnnotation.shortcut}]`;
      }

      annotations.push({
        ...annotation,
        relatedTo: relatedAnnotations,
        graphStructure,
      });
    });
    return annotations;
  }

  async annotateColumn(
    annotateColumnDto: AnnotateColumnDto,
  ): Promise<AnnotationResponse[]> {
    const { firebaseDatasetID, columns } = annotateColumnDto;

    // Check if a relationship already exists between the Column and Annotation

    const createdRel = [];
    for (const { columnName, selectedAnnotationId } of columns) {
      const existingIsAnnotatedRelationship = await this.queryRepository
        .initQuery()
        .match([
          node('dataset:Dataset', 'Dataset', {
            firebaseDatasetID: firebaseDatasetID,
          }),
          relation('out', 'rel1', 'HAS_COLUMN'),
          node('column:Column', 'Column', {
            columnName: columnName,
          }),
          relation('out', 'rel2', 'ANNOTATED_WITH'),
          node('annotation:Annotation', 'Annotation', {
            id: selectedAnnotationId,
          }),
        ])
        .return(['column', 'annotation'])
        .run();

      if (existingIsAnnotatedRelationship.length === 0) {
        // Create the 'is_ANNOTATED' relationship between Column and Annotation
        const rel = await this.queryRepository
          .initQuery()
          .match([
            node('dataset:Dataset', 'Dataset', {
              firebaseDatasetID: firebaseDatasetID,
            }),
            relation('out', 'rel1', 'HAS_COLUMN'),
            node('column:Column', 'Column', {
              columnName: columnName,
            }),
          ])
          .match([
            node('annotation:Annotation', 'Annotation', {
              id: selectedAnnotationId,
            }),
          ])
          .create([
            node('column'),
            relation('out', 'rel2', 'ANNOTATED_WITH'),
            node('annotation'),
          ])
          .return('rel2')
          .run();
        if (rel.length > 0) {
          createdRel.push(rel[0].rel2);
        }
      }
    }

    return createdRel;
  }

  // getExport
  async getExport(id: string): Promise<GetExportResponse> {
    const query = `
    MATCH (dataset:Dataset {firebaseDatasetID: $id})-[:HAS_COLUMN]->(column)
    OPTIONAL MATCH (column)-[:ANNOTATED_WITH]->(annotation)
    WITH dataset, column, collect(DISTINCT {annotation: annotation}) as annotations
    RETURN dataset, collect(DISTINCT {column: column, annotations: annotations}) as columns
  `;

    const results = await this.queryRepository
      .initQuery()
      .raw(query, { id })
      .run();

    // Process the results to filter out unwanted properties
    const processedResults = results.map((result) => {
      const columns = result.columns.map((columnData) => {
        const columnProperties = columnData.column.properties;
        const annotations = columnData.annotations.map((annotationData) => {
          if (annotationData && annotationData.annotation) {
            const { createdAt, firebaseUserUID, ...filteredProperties } =
              annotationData.annotation.properties;
            return { ...filteredProperties };
          }
          return null;
        });

        return {
          ...columnProperties,
          annotations: annotations.filter((annotation) => annotation !== null),
        };
      });

      return {
        dataset: result.dataset.properties,
        columns,
      };
    });
    // right now i have the correct strcuture but dont have the tree structure of anotaions
    await this.addRelatedToField(processedResults);
    return processedResults[0];
  }

  async addRelatedToField(dataArray) {
    // Create an array to hold all the promises
    const promiseArray = [];

    for (const dataObject of dataArray) {
      for (const column of dataObject.columns) {
        for (const annotation of column.annotations) {
          // Push a promise to the array to fetch related annotations for each annotation
          promiseArray.push(
            this.getRelatedAnnotations(annotation).then(
              (relatedAnnotations) => {
                annotation.related_to = relatedAnnotations;
              },
            ),
          );
        }
      }
    }

    // Wait for all promises to resolve
    await Promise.all(promiseArray);
  }

  async getRelatedAnnotations(annotation) {
    const relatedAnnotations = await this.queryRepository
      .initQuery()
      .raw(
        `MATCH (a:Annotation {id: $annotationId})-[:RELATED_TO]->(r:Annotation)
        RETURN r`,
        { annotationId: annotation.id },
      )
      .run();

    if (relatedAnnotations.length === 0) {
      return [];
    }

    // Recursively get related annotations for each related annotation
    const nestedRelatedAnnotations = await Promise.all(
      relatedAnnotations.map(async (relatedAnnotation) => {
        // Destructure the properties, excluding createdAt and firebaseUserUID
        const { createdAt, firebaseUserUID, ...properties } =
          relatedAnnotation.r.properties;

        return {
          ...properties,
          related_to: await this.getRelatedAnnotations(properties),
        };
      }),
    );

    return nestedRelatedAnnotations;
  }

  async deleteAnnotation(id: string): Promise<string> {
    const query = `
      MATCH (annotation:Annotation {id: $id})
      DETACH DELETE annotation
      RETURN COUNT(annotation) as deletedCount
    `;

    const a = await this.queryRepository.initQuery().raw(query, { id }).run();
    if (a[0].deletedCount > 0) {
      return 'Annotation deleted successfully';
    } else {
      return 'Annotation not found';
    }
  }

  async connectAnnotation(
    connectAnnotationsDto: ConnectAnnotationsDto,
  ): Promise<string> {
    const { annotationParent, annotationChild } = connectAnnotationsDto;

    const checkQuery = `
      MATCH (annotationChild:Annotation {id: $annotationChild})
      OPTIONAL MATCH (annotationChild)-[:RELATED_TO]->(annotationParent:Annotation {id: $annotationParent})
      RETURN COUNT(annotationParent) as relationshipCount
    `;

    const checkResult = await this.queryRepository
      .initQuery()
      .raw(checkQuery, {
        annotationParent: annotationParent,
        annotationChild: annotationChild,
      })
      .run();

    if (checkResult[0].relationshipCount > 0) {
      // Relationship already exists
      return 'Relationship already exists';
    }

    // Relationship does not exist, create it
    const createQuery = `
    MATCH (annotationChild:Annotation {id: $annotationChild}), (annotationParent:Annotation {id: $annotationParent})
    CREATE (annotationChild)-[:RELATED_TO]->(annotationParent)
    RETURN annotationChild, annotationParent
  `;

    await this.queryRepository
      .initQuery()
      .raw(createQuery, {
        annotationParent: annotationParent,
        annotationChild: annotationChild,
      })
      .run();

    return 'Annotation connected successfully';
  }

  async getColumnAnnotations(
    datasetId,
    columnName,
  ): Promise<GetColumnAnnotationsResponse[]> {
    const query = `
  MATCH (dataset:Dataset {firebaseDatasetID: $id})-[:HAS_COLUMN]->(column:Column {columnName: $columnNameValue})
  MATCH (column)-[:ANNOTATED_WITH]->(annotation:Annotation)
  RETURN COLLECT(annotation) AS annotations
`;

    const result = await this.queryRepository
      .initQuery()
      .raw(query, {
        columnNameValue: columnName,
        id: datasetId,
      })
      .run();

    // Extract the properties from the result annotations
    const annotations =
      result[0]?.annotations.map((annotation) => annotation.properties) || [];

    return annotations;
  }
}
