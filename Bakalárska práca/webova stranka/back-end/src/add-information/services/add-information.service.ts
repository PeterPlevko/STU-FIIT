import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Battle, BattleDocument } from 'src/schemas/battle.schema';
import { Cemetery, CemeteryDocument } from 'src/schemas/cemetery.schema';
import { Memorial, MemorialDocument } from 'src/schemas/memorial.schema';
import { BattleDto } from '../dto-and-response/battle.dto';
import { CemeteryDto } from '../dto-and-response/cemetery.dto';
import { MemorialDto } from '../dto-and-response/memorial.dto';
import { WarCampDto } from '../dto-and-response/warCamp.dto';
import { WarCamp, WarCampDocument } from 'src/schemas/warCamp.schema';
import { SoldierDto } from '../dto-and-response/soldier.dto';
import { Soldier, SoldierDocument } from 'src/schemas/soldier.schema';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AddInformationService {
  constructor(
    private httpService: HttpService,
    @InjectModel(Memorial.name) private memorialModel: Model<MemorialDocument>,
    @InjectModel(Cemetery.name) private cemeteryModel: Model<CemeteryDocument>,
    @InjectModel(WarCamp.name) private warCampModel: Model<WarCampDocument>,
    @InjectModel(Soldier.name) private soldierModel: Model<SoldierDocument>,
    @InjectModel(Battle.name) private battleModel: Model<BattleDocument>,
  ) {}

  async addMemorial(memorial: MemorialDto) {
    const createdMemorial = new this.memorialModel(memorial);
    createdMemorial.state = 'added';
    return await createdMemorial.save();
  }

  async addCemetery(cemetery: CemeteryDto) {
    const createdCemetery = new this.cemeteryModel(cemetery);
    createdCemetery.state = 'added';
    return await createdCemetery.save();
  }

  async addWarCamp(warCamp: WarCampDto) {
    const createdWarCamp = new this.warCampModel(warCamp);
    createdWarCamp.state = 'added';
    return await createdWarCamp.save();
  }

  async addSoldier(soldier: SoldierDto) {
    const createdSoldier = new this.soldierModel(soldier);
    createdSoldier.state = 'added';
    return await createdSoldier.save();
  }

  async addBattle(battle: BattleDto) {
    const createdBattle = new this.battleModel(battle);
    createdBattle.state = 'added';
    return await createdBattle.save();
  }
}
