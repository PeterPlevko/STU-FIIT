import { IsNotEmpty } from 'class-validator';

export class UpdateOrCreateResponse {
  @IsNotEmpty()
  columnName: string;

  @IsNotEmpty()
  columnDescription: string;
}
