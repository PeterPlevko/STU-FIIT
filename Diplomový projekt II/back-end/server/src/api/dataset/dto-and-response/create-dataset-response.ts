import { IsNotEmpty } from 'class-validator';

export class CreateDatasetResponse {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  datasetName: string;

  @IsNotEmpty()
  firebaseDatasetID: string;

  @IsNotEmpty()
  firebaseUserUID: string;
}
