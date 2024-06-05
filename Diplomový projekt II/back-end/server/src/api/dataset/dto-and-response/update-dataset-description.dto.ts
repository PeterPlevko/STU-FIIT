import { IsNotEmpty } from 'class-validator';

export class UpdateDatasetDescriptionDTO {
  @IsNotEmpty()
  datasetDescription: number;

  @IsNotEmpty()
  id: string;
}
