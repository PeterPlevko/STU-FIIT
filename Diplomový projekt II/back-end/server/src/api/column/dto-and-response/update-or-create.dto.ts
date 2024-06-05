import { ArrayNotEmpty, IsArray, IsNotEmpty } from 'class-validator';

export class UpdateOrCreateDTO {
  @IsNotEmpty()
  firebaseDatasetID: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'Columns should not be empty' })
  columns: Array<{ columnName: string; columnDescription: string }>;
}
