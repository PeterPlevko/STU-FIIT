import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAnnotationDto {
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

  @IsOptional()
  relatedTo: string | null;
}
