import { IsNotEmpty } from 'class-validator';

export class GetColumnDescriptionResponse {
  @IsNotEmpty()
  datasetId: string;

  @IsNotEmpty()
  columnName: string;
}
