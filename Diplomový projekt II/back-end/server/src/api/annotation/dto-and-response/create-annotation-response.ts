import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';

export class RelatedToAnnotation {
  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  firebaseUserUID: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  id: string;
}

export class CreateAnnotationResponse {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  firebaseUserUID: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  shortcut: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsArray()
  @ValidateNested({ each: true })
  relatedToAnnotations: RelatedToAnnotation[];
}
