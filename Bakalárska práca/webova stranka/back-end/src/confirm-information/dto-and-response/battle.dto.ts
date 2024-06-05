import { IsNotEmpty } from 'class-validator';

export class BattleDto {
  @IsNotEmpty()
  GPS: string;

  name: string;

  startDate: Date;

  endDate: Date;

  result: string;

  id: string;

  state: string;

  austriaHungaryArmy: string;

  austriaHungaryArmyNumber: number;

  russianArmyNumber: number;

  russianArmy: string;

  note: string;

  addedBy: string;
}
