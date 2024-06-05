import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';
import { GetColumnDescriptionResponse } from './dto-and-response/get-column-description-response';
import { node, relation } from 'cypher-query-builder';
import { UpdateOrCreateDTO } from './dto-and-response/update-or-create.dto';
import { UpdateOrCreateResponse } from './dto-and-response/update-or-create-response';

@Injectable()
export class ColumnService {
  constructor(private readonly queryRepository: QueryRepository) {}

  // getColumnDescription
  async getColumnDescription(
    columnName: string,
    datasetId: string,
  ): Promise<GetColumnDescriptionResponse | null> {
    const query = `
      MATCH (dataset:Dataset {firebaseDatasetID: $datasetId})-[:HAS_COLUMN]->(column:Column {columnName: $columnName})
      RETURN column
    `;

    const parameters = {
      datasetId,
      columnName,
    };

    const results = await this.queryRepository
      .initQuery()
      .raw(query, parameters)
      .run();

    if (results.length > 0) {
      return results[0].column.properties;
    } else {
      return null;
    }
  }

  async updateOrCreate(
    updateOrCreate: UpdateOrCreateDTO,
  ): Promise<UpdateOrCreateResponse[]> {
    const { firebaseDatasetID, columns } = updateOrCreate;

    const results: UpdateOrCreateResponse[] = [];

    // Iterate over each column in the array
    for (const { columnName, columnDescription } of columns) {
      // Check if a Column with the same name exists
      const existingColumns = await this.queryRepository
        .initQuery()
        .match([
          node('dataset:Dataset', 'Dataset', {
            firebaseDatasetID: firebaseDatasetID,
          }),
          relation('out', 'rel', 'HAS_COLUMN'),
          node('column:Column', 'Column', {
            columnName: columnName,
          }),
        ])
        .return('column')
        .run();

      // Check if the column exists
      if (existingColumns.length > 0) {
        // Update the Column node if it exists
        const updateResult = await this.queryRepository
          .initQuery()
          .match([
            node('dataset:Dataset', 'Dataset', {
              firebaseDatasetID: firebaseDatasetID,
            }),
            relation('out', 'rel', 'HAS_COLUMN'),
            node('column:Column', 'Column', {
              columnName: columnName,
            }),
          ])
          .setValues({
            'column.columnDescription': columnDescription,
          })
          .return('column')
          .run();

        if (updateResult.length > 0) {
          results.push(updateResult[0].column.properties);
        }
      } else {
        // Create the Column node if it doesn't exist
        const createResult = await this.queryRepository
          .initQuery()
          .match([
            node('dataset:Dataset', 'Dataset', {
              firebaseDatasetID: firebaseDatasetID,
            }),
          ])
          .create([
            node('dataset'),
            relation('out', 'rel', 'HAS_COLUMN'),
            node('column:Column', 'Column', {
              columnName: columnName,
              columnDescription: columnDescription,
            }),
          ])
          .return('column')
          .run();

        if (createResult.length > 0) {
          results.push(createResult[0].column.properties);
        }
      }
    }

    if (results.length > 0) {
      return results;
    } else {
      return null;
    }
  }
}
