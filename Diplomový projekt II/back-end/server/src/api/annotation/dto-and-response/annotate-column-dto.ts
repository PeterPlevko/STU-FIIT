import { IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class AnnotateColumnDto {
  @IsNotEmpty()
  firebaseDatasetID: string;

  @IsNotEmpty()
  @IsArray()
  columns: ColumnDto[];
}

export class ColumnDto {
  @IsNotEmpty()
  columnName: string;

  @IsNotEmpty()
  columnDescription: string;

  @IsOptional()
  selectedAnnotationId: string | null;
}
