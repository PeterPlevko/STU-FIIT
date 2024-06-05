import { IsNotEmpty } from 'class-validator';

export class CreateDatasetDto {
  @IsNotEmpty()
  datasetName: string;

  @IsNotEmpty()
  firebaseUserUID: string;

  @IsNotEmpty()
  firebaseDatasetID: string;
}
