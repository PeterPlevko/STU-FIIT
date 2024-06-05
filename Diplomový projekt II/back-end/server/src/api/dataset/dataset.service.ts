import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';
import { CreateDatasetDto } from './dto-and-response/create-dataset.dto';
import { CreateDatasetResponse } from './dto-and-response/create-dataset-response';
import { UpdateDatasetDescriptionDTO } from './dto-and-response/update-dataset-description.dto';

@Injectable()
export class DatasetService {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createDataset(
    createDatasetDto: CreateDatasetDto,
  ): Promise<CreateDatasetResponse | null> {
    const { firebaseUserUID, firebaseDatasetID, datasetName } =
      createDatasetDto;

    const result = await this.queryRepository
      .initQuery()
      .createNode('Dataset', 'Dataset', {
        firebaseUserUID: firebaseUserUID,
        firebaseDatasetID: firebaseDatasetID,
        datasetName: datasetName,
      })
      .return('ID(Dataset) as id, properties(Dataset) as properties')
      .run();

    if (result.length > 0) {
      const { id, properties } = result[0];
      return { id, ...properties };
    }

    return null;
  }

  async getDatasetDescription(datasetId: string): Promise<string> {
    const result = await this.queryRepository
      .initQuery()
      .matchNode('Dataset', 'Dataset', {
        firebaseDatasetID: datasetId,
      })
      .return('ID(Dataset) as id, properties(Dataset) as properties')
      .run();

    if (result[0]) {
      return result[0].properties.datasetDescription;
    } else {
      return '';
    }
  }

  async updateDatasetDescription(
    updateDatasetDescription: UpdateDatasetDescriptionDTO,
  ): Promise<string> {
    const { datasetDescription, id } = updateDatasetDescription;

    const result = await this.queryRepository
      .initQuery()
      .matchNode('Dataset', 'Dataset', {
        firebaseDatasetID: id,
      })
      .setValues({ 'Dataset.datasetDescription': datasetDescription })
      .return('ID(Dataset) as id, properties(Dataset) as properties')
      .run();

    return result[0].properties.datasetDescription;
  }
}
