import { IsNotEmpty } from 'class-validator';

export class SoldierDto {
  @IsNotEmpty()
  name: string;

  dateOfDeath: string;

  dateOfBirth: string[];

  id: string;

  state: string;

  story: string[];

  addedBy: string;
}
