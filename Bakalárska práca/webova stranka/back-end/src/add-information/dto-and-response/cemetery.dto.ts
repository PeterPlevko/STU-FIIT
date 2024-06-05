import { IsNotEmpty } from 'class-validator';

export class CemeteryDto {
  cemeteryType: string;

  nationality: string[];

  reasonOfDeath: string[];

  dateOfDeath: string[];

  numberOfGraves: number;

  numberOfBurried: number;

  @IsNotEmpty()
  GPS: string;

  addedBy: string;
}
