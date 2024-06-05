import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectAnnotationsDto {
  @IsNotEmpty()
  @IsString()
  annotationParent: string;

  @IsNotEmpty()
  @IsString()
  annotationChild: string;
}
