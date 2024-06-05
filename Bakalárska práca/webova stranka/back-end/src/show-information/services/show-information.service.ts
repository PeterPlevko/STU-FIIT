import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Battle, BattleDocument } from 'src/schemas/battle.schema';
import { Cemetery, CemeteryDocument } from 'src/schemas/cemetery.schema';
import { Memorial, MemorialDocument } from 'src/schemas/memorial.schema';
import { Soldier, SoldierDocument } from 'src/schemas/soldier.schema';
import { WarCamp, WarCampDocument } from 'src/schemas/warCamp.schema';

@Injectable()
export class ShowInformationService {
  constructor(
    @InjectModel(Cemetery.name) private cemeteryModel: Model<CemeteryDocument>,
    @InjectModel(Battle.name) private battleModel: Model<BattleDocument>,
    @InjectModel(Memorial.name) private memorialModel: Model<MemorialDocument>,
    @InjectModel(WarCamp.name) private warCampModel: Model<WarCampDocument>,
    @InjectModel(Soldier.name) private soldierModel: Model<SoldierDocument>,
  ) {}

  // here are added by developer
  async getMemorialDefault() {
    const memorial = await this.memorialModel.find({
      state: 'confirmed',
      addedBy: 'developer',
    });
    return memorial;
  }

  async getSoldierDefault() {
    const soldier = await this.soldierModel.find({
      state: 'confirmed',
      addedBy: 'developer',
    });
    return soldier;
  }

  async getBattleDefault() {
    const battle = await this.battleModel.find({
      state: 'confirmed',
      addedBy: 'developer',
    });
    return battle;
  }

  async getCemeteryDefault() {
    const cemeterie = await this.cemeteryModel.find({
      state: 'confirmed',
      addedBy: 'developer',
    });
    return cemeterie;
  }

  async getWarCampDefault() {
    const warCamp = await this.warCampModel.find({
      state: 'confirmed',
      addedBy: 'developer',
    });
    return warCamp;
  }
  // here are added with my web page
  async getMemorialAdded() {
    const memorial = await this.memorialModel.find({
      state: 'confirmed',
      addedBy: { $ne: 'developer' },
    });
    return memorial;
  }

  async getSoldierAdded() {
    const soldier = await this.soldierModel.find({
      state: 'confirmed',
      addedBy: { $ne: 'developer' },
    });
    return soldier;
  }

  async getBattleAdded() {
    const battle = await this.battleModel.find({
      state: 'confirmed',
      addedBy: { $ne: 'developer' },
    });
    return battle;
  }

  async getCemeteryAdded() {
    const cemeterie = await this.cemeteryModel.find({
      state: 'confirmed',
      addedBy: { $ne: 'developer' },
    });
    return cemeterie;
  }

  async getWarCampAdded() {
    const warCamp = await this.warCampModel.find({
      state: 'confirmed',
      addedBy: { $ne: 'developer' },
    });
    return warCamp;
  }
}
