import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Battle, BattleDocument } from 'src/schemas/battle.schema';
import { Cemetery, CemeteryDocument } from 'src/schemas/cemetery.schema';
import { Memorial, MemorialDocument } from 'src/schemas/memorial.schema';
import { Soldier, SoldierDocument } from 'src/schemas/soldier.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { WarCamp, WarCampDocument } from 'src/schemas/warCamp.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Cemetery.name) private cemeteryModel: Model<CemeteryDocument>,
    @InjectModel(Battle.name) private battleModel: Model<BattleDocument>,
    @InjectModel(Memorial.name) private memorialModel: Model<MemorialDocument>,
    @InjectModel(WarCamp.name) private warCampModel: Model<WarCampDocument>,
    @InjectModel(Soldier.name) private soldierModel: Model<SoldierDocument>,
  ) {}

  async getAllUsers() {
    const users = await this.userModel.find();
    return users;
  }

  //remove user
  async removeUser(id: string) {
    const removedUser = await this.userModel.findByIdAndRemove(id);
    return removedUser;
  }

  //remove use
  async updateUser(user: any) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      { _id: user._id },
      {
        $set: {
          userType: user.userType,
          surname: user.surname,
          firstname: user.firstname,
          email: user.email,
          username: user.username,
        },
      },
      {
        new: true,
      },
    );
    return updatedUser;
  }

  async addUser(user: any) {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }
  ///////////////////////////////////////////////// cemetery
  async getCemeteries() {
    const cemeteries = await this.cemeteryModel.find();
    return cemeteries;
  }

  async removeCemetery(id: string) {
    const removedCemetery = await this.cemeteryModel.findByIdAndRemove(id);
    return removedCemetery;
  }

  async updateCemetery(cemetery: any) {
    const updatedCemetery = await this.cemeteryModel.findByIdAndUpdate(
      { _id: cemetery._id },
      {
        $set: {
          GPS: cemetery.GPS,
          addedBy: cemetery.addedBy,
          cemeteryType: cemetery.cemeteryType,
          dateOfDeath: cemetery.dateOfDeath,
          nationality: cemetery.nationality,
          numberOfBurried: cemetery.numberOfBurried,
          numberOfGraves: cemetery.numberOfGraves,
          reasonOfDeath: cemetery.reasonOfDeath,
          state: 'added',
        },
      },
      {
        new: true,
      },
    );
    return updatedCemetery;
  }

  async addCemetery(cemetery: any) {
    const createdCemetery = new this.cemeteryModel({
      GPS: cemetery.GPS || '',
      cemeteryType: cemetery.cemeteryType || '',
      dateOfDeath: cemetery.dateOfDeath || [],
      nationality: cemetery.nationality || [],
      numberOfBurried: cemetery.numberOfBurried || null,
      numberOfGraves: cemetery.numberOfGraves || null,
      reasonOfDeath: cemetery.reasonOfDeath || [],
      state: 'added',
      addedBy: 'admin',
    });

    return await createdCemetery.save();
  }
  ///////////////////////////////////////////////// soldier
  async getSoldiers() {
    const soldiers = await this.soldierModel.find();
    return soldiers;
  }

  async deleteSoldier(id: string) {
    const deletedSoldieer = await this.soldierModel.findByIdAndRemove(id);
    return deletedSoldieer;
  }

  async updateSoldier(soldier: any) {
    const updatedSoldier = await this.soldierModel.findByIdAndUpdate(
      { _id: soldier._id },
      {
        $set: {
          addedBy: soldier.addedBy,
          dateOfBirth: soldier.dateOfBirth,
          dateOfDeath: soldier.dateOfDeath,
          name: soldier.name,
          state: 'added',
          story: soldier.story,
        },
      },
      {
        new: true,
      },
    );
    return updatedSoldier;
  }

  async addSoldier(soldier: any) {
    const createdSoldier = new this.soldierModel({
      dateOfBirth: soldier.dateOfBirth || '',
      dateOfDeath: soldier.dateOfDeath || '',
      name: soldier.name || '',
      state: 'added',
      story: soldier.story || '',
      addedBy: 'admin',
    });

    return await createdSoldier.save();
  }
  ///////////////////////////////////////////////// battle
  async getBattles() {
    const battles = await this.battleModel.find();
    return battles;
  }
  async deleteBattle(id: string) {
    const deletedBattle = await this.battleModel.findByIdAndRemove(id);
    return deletedBattle;
  }

  async updateBattle(battle: any) {
    const updatedBattle = await this.battleModel.findByIdAndUpdate(
      { _id: battle._id },
      {
        $set: {
          GPS: battle.GPS,
          addedBy: battle.addedBy,
          austriaHungaryArmy: battle.austriaHungaryArmy,
          austriaHungaryArmyNumber: battle.austriaHungaryArmyNumber,
          endDate: battle.endDate,
          name: battle.name,
          note: battle.note,
          result: battle.result,
          russianArmy: battle.russianArmy,
          russianArmyNumber: battle.russianArmyNumber,
          startDate: battle.startDate,
          state: 'added',
        },
      },
      {
        new: true,
      },
    );
    return updatedBattle;
  }

  async addBattle(battle: any) {
    const createdBattle = new this.battleModel({
      GPS: battle.GPS || '',
      addedBy: 'admin',
      austriaHungaryArmy: battle.austriaHungaryArmy || '',
      austriaHungaryArmyNumber: battle.austriaHungaryArmyNumber || '',
      endDate: battle.endDate || '',
      name: battle.name || '',
      note: battle.note || '',
      result: battle.result || '',
      russianArmy: battle.russianArmy || '',
      russianArmyNumber: battle.russianArmyNumber || '',
      startDate: battle.startDate || '',
      state: 'added',
    });

    return await createdBattle.save();
  }
  ///////////////////////////////////////////////// warCamp
  async getWarCamps() {
    const warCamps = await this.warCampModel.find();
    return warCamps;
  }

  async deleteWarCamp(id: string) {
    const deletedWarCamp = await this.warCampModel.findByIdAndRemove(id);
    return deletedWarCamp;
  }

  async updateWarCamp(warCamp: any) {
    const updatedWarCamp = await this.warCampModel.findByIdAndUpdate(
      { _id: warCamp._id },
      {
        $set: {
          GPS: warCamp.GPS,
          addedBy: warCamp.addedBy,
          campType: warCamp.campType,
          equipment: warCamp.equipment,
          mainCaptiveNationality: warCamp.mainCaptiveNationality,
          numberOfCaptives: warCamp.numberOfCaptives,
          state: 'added',
        },
      },
      {
        new: true,
      },
    );
    return updatedWarCamp;
  }

  async addWarCamp(warCamp: any) {
    const createdWarCamp = new this.warCampModel({
      GPS: warCamp.GPS || '',
      addedBy: 'admin',
      campType: warCamp.campType || '',
      equipment: warCamp.equipment || '',
      mainCaptiveNationality: warCamp.mainCaptiveNationality || '',
      numberOfCaptives: warCamp.numberOfCaptives || '',
      state: 'added',
    });

    return await createdWarCamp.save();
  }

  ///////////////////////////////////////////////// pamatnik
  async getMemorials() {
    const memorials = await this.memorialModel.find();
    return memorials;
  }

  async deleteMemorial(id: string) {
    const deletedMemorial = await this.memorialModel.findByIdAndRemove(id);
    return deletedMemorial;
  }

  async updateMemorial(memorial: any) {
    const updatedMemorial = await this.memorialModel.findByIdAndUpdate(
      { _id: memorial._id },
      {
        $set: {
          GPS: memorial.GPS,
          addedBy: memorial.addedBy,
          dateOfBirth: memorial.dateOfBirth,
          dateOfDeath: memorial.dateOfDeath,
          imagePath: memorial.imagePath,
          location: memorial.location,
          municipalityDescription: memorial.municipalityDescription,
          name: memorial.name,
          photoDescription: memorial.photoDescription,
          state: 'added',
          deceasedList: memorial.deceasedList,
        },
      },
      {
        new: true,
      },
    );
    return updatedMemorial;
  }

  async updateMemorialWithoutFile(memorial: any) {
    const updatedMemorial = await this.memorialModel.findByIdAndUpdate(
      { _id: memorial._id },
      {
        $set: {
          GPS: memorial.GPS,
          addedBy: memorial.addedBy,
          dateOfBirth: memorial.dateOfBirth,
          dateOfDeath: memorial.dateOfDeath,
          location: memorial.location,
          municipalityDescription: memorial.municipalityDescription,
          name: memorial.name,
          photoDescription: memorial.photoDescription,
          state: 'added',
          deceasedList: memorial.deceasedList,
        },
      },
      {
        new: true,
      },
    );
    return updatedMemorial;
  }

  async addMemorial(memorial: any) {
    const createdMemorial = new this.memorialModel({
      GPS: memorial.GPS,
      addedBy: 'admin',
      dateOfBirth: memorial.dateOfBirth,
      dateOfDeath: memorial.dateOfDeath,
      imagePath: memorial.imagePath,
      location: memorial.location,
      municipalityDescription: memorial.municipalityDescription,
      name: memorial.name,
      photoDescription: memorial.photoDescription,
      state: 'added',
      deceasedList: memorial.deceasedList,
    });

    return await createdMemorial.save();
  }

  // find memorial by id
  async getMemorialById(id: string) {
    const memorial = await this.memorialModel.findById(id);
    return memorial;
  }
}
