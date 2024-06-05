import { IsNotEmpty, IsString } from 'class-validator';

export class GetColumnAnnotationsResponse {
  @IsNotEmpty()
  @IsString()
  createdAt: string;

  @IsNotEmpty()
  @IsString()
  shortcut: string;

  @IsNotEmpty()
  @IsString()
  firebaseUserUID: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  id: string;
}
