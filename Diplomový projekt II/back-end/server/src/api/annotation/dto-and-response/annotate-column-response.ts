import { IsNotEmpty } from 'class-validator';

export class AnnotationResponse {
  @IsNotEmpty()
  identity: string;

  @IsNotEmpty()
  start: string;

  @IsNotEmpty()
  end: string;

  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  properties: object;
}
