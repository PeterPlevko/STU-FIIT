import { IsNotEmpty } from 'class-validator';

export class BattleDto {
  @IsNotEmpty()
  GPS: string;

  name: string;

  startDate: string;

  endDate: string;

  result: string;

  austriaHungaryArmy: string;

  austriaHungaryArmyNumber: number;

  russianArmyNumber: number;

  russianArmy: string;

  note: string;

  addedBy: string;
}
