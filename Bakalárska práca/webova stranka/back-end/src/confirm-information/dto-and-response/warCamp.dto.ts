import { IsNotEmpty } from 'class-validator';

export class WarCampDto {
  campType: string;

  @IsNotEmpty()
  GPS: string;

  mainCaptiveNationality: string;

  id: string;

  equipment: string[];

  numberOfCaptives: number;

  state: string;

  addedBy: string;
}
