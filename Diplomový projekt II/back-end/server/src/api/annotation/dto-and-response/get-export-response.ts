import { IsNotEmpty, IsOptional } from 'class-validator';

export class Annotation {
  @IsNotEmpty()
  createdAt: string;

  @IsNotEmpty()
  shortcut: string;

  @IsNotEmpty()
  firebaseUserUID: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  id: string;

  @IsOptional()
  related_to: Annotation[] | null;
}

export class Column {
  @IsNotEmpty()
  columnDescription: string;

  @IsNotEmpty()
  columnName: string;

  @IsNotEmpty()
  annotations: Annotation[];
}

export class Dataset {
  @IsNotEmpty()
  firebaseUserUID: string;

  @IsNotEmpty()
  datasetName: string;

  @IsNotEmpty()
  firebaseDatasetID: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  authorUID: string;

  @IsNotEmpty()
  publishDate: string;

  @IsNotEmpty()
  authorName: string;

  @IsNotEmpty()
  size: string;
}

export class GetExportResponse {
  dataset: Dataset;
  columns: Column[];
}
