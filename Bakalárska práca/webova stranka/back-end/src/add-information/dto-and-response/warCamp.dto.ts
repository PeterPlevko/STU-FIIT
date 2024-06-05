import { IsNotEmpty } from 'class-validator';

export class WarCampDto {
  campType: string;

  @IsNotEmpty()
  GPS: string;

  mainCaptiveNationality: string;

  equipment: string[];

  numberOfCaptives: number;

  addedBy: string;
}
