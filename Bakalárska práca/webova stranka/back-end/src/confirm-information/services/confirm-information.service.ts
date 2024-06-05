import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Battle, BattleDocument } from 'src/schemas/battle.schema';
import { Cemetery, CemeteryDocument } from 'src/schemas/cemetery.schema';
import { Memorial, MemorialDocument } from 'src/schemas/memorial.schema';
import { Soldier, SoldierDocument } from 'src/schemas/soldier.schema';
import { WarCamp, WarCampDocument } from 'src/schemas/warCamp.schema';
import { BattleDto } from '../dto-and-response/battle.dto';
import { CemeteryDto } from '../dto-and-response/cemetery.dto';
import { MemorialDto } from '../dto-and-response/memorial.dto';
import { SoldierDto } from '../dto-and-response/soldier.dto';
import { WarCampDto } from '../dto-and-response/warCamp.dto';

@Injectable()
export class ConfirmInformationService {
  constructor(
    @InjectModel(Cemetery.name) private cemeteryModel: Model<CemeteryDocument>,
    @InjectModel(Battle.name) private battleModel: Model<BattleDocument>,
    @InjectModel(Memorial.name) private memorialModel: Model<MemorialDocument>,
    @InjectModel(WarCamp.name) private warCampModel: Model<WarCampDocument>,
    @InjectModel(Soldier.name) private soldierModel: Model<SoldierDocument>,
  ) {}
  async getAllUnconfirmedCount() {
    const cemeteries = await this.cemeteryModel.find({ state: 'added' });
    const battles = await this.battleModel.find({ state: 'added' });
    const memorials = await this.memorialModel.find({ state: 'added' });
    const soldiers = await this.soldierModel.find({ state: 'added' });
    const warCamps = await this.warCampModel.find({ state: 'added' });
    return (
      cemeteries.length +
      battles.length +
      memorials.length +
      soldiers.length +
      warCamps.length
    );
  }

  async getMemorial() {
    const memorial = await this.memorialModel.findOne({ state: 'added' });
    return memorial;
  }

  async getSoldier() {
    const soldier = await this.soldierModel.findOne({ state: 'added' });
    return soldier;
  }

  async getBattle() {
    const battle = await this.battleModel.findOne({ state: 'added' });
    return battle;
  }

  async getCemetery() {
    const cemetery = await this.cemeteryModel.findOne({ state: 'added' });
    return cemetery;
  }

  async getWarCamp() {
    const warCamp = await this.warCampModel.findOne({ state: 'added' });
    return warCamp;
  }

  // here starts changing state
  async addWarCamp(warCamp: WarCampDto) {
    warCamp.state = 'confirmed';
    const updatedWarCamp = await this.warCampModel.findByIdAndUpdate(
      warCamp.id,
      warCamp,
      { new: true },
    );
    return updatedWarCamp;
  }

  //remove warcamp
  async removeWarCamp(warCampID: string) {
    const updatedWarCamp = await this.warCampModel.findByIdAndRemove(warCampID);
    return updatedWarCamp;
  }

  // here starts changing state
  async addBattle(battle: BattleDto) {
    battle.state = 'confirmed';
    const updatedBattle = await this.battleModel.findByIdAndUpdate(
      battle.id,
      battle,
      { new: true },
    );
    return updatedBattle;
  }

  //remove battle
  async removeBattle(battleID: string) {
    const updatedBattle = await this.battleModel.findByIdAndRemove(battleID);
    return updatedBattle;
  }

  // this function changes state of soldier from added to confirmed
  async addSoldier(soldier: SoldierDto) {
    soldier.state = 'confirmed';
    const updatedSoldier = await this.soldierModel.findByIdAndUpdate(
      soldier.id,
      soldier,
      { new: true },
    );
    return updatedSoldier;
  }

  // this function removes soldier by id
  async removeSoldier(soldierID: string) {
    const updatedSoldier = await this.soldierModel.findByIdAndRemove(soldierID);
    return updatedSoldier;
  }

  // this function changes state of soldier from added to confirmed
  async addCemetery(cemetery: CemeteryDto) {
    cemetery.state = 'confirmed';
    const updatedCemetery = await this.cemeteryModel.findByIdAndUpdate(
      cemetery.id,
      cemetery,
      { new: true },
    );
    return updatedCemetery;
  }

  // this function removes soldier by id
  async removeCemetery(cemeteryID: string) {
    const updatedCemetery = await this.cemeteryModel.findByIdAndRemove(
      cemeteryID,
    );
    return updatedCemetery;
  }

  // this function removes soldier by id
  async removeMemorial(memorialID: string) {
    const updatedMemorial = await this.memorialModel.findByIdAndRemove(
      memorialID,
    );
    return updatedMemorial;
  }

  // this function changes state of soldier from added to confirmed
  async addMemorial(memorial: MemorialDto) {
    memorial.state = 'confirmed';
    const updatedMemorial = await this.memorialModel.findByIdAndUpdate(
      memorial.id,
      memorial,
      { new: true },
    );
    return updatedMemorial;
  }
}
