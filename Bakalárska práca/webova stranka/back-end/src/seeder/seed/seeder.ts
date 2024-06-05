import warCampDefault from './default/warCamp.json';
import battleDefault from './default/battle.json';
import cemeteryDefault from './default/cemetery.json';
import soldierDefault from './default/soldier.json';
import memorialDefault from './default/memorial.json';
import userDefault from './default/user.json';
// import default values
import warCampAdded from './added/warCamp.json';
import battleAdded from './added/battle.json';
import cemeteryAdded from './added/cemetery.json';
import soldierAdded from './added/soldier.json';
import memorialAdded from './added/memorial.json';
// import added values
import { WarCampModel } from '../../schemas/warCamp.schema';
import { BattleModel } from '../../schemas/battle.schema';
import { CemeteryModel } from '../../schemas/cemetery.schema';
import { SoldierModel } from '../../schemas/soldier.schema';
import { MemorialModel } from '../../schemas/memorial.schema';
import { UserModel } from '../../schemas/user.schema';
import mongoose from 'mongoose';

export const seed = async () => {
  mongoose
    .connect(`mongodb://mongo/bakalarska-praca`)
    // connect to docker
    // .connect('mongodb://localhost/bakalarska-praca')
    // connect local host
    .then(() => {
      console.log('Mongo conection open');
    })
    .catch(err => {
      console.log(err);
    });

  const seedDB = async () => {
    const warCamps = await WarCampModel.find();
    if (warCamps.length === 0) {
      await WarCampModel.deleteMany({});
      await WarCampModel.insertMany(warCampDefault);
      await WarCampModel.insertMany(warCampAdded);
      console.log('warCamps seeded');
    }
    const battles = await BattleModel.find();
    if (battles.length === 0) {
      await BattleModel.deleteMany({});
      await BattleModel.insertMany(battleDefault);
      await BattleModel.insertMany(battleAdded);
      console.log('battles seeded');
    }

    const cemeteries = await CemeteryModel.find();
    if (cemeteries.length === 0) {
      await CemeteryModel.deleteMany({});
      await CemeteryModel.insertMany(cemeteryDefault);
      await CemeteryModel.insertMany(cemeteryAdded);
      console.log('cemeteries seeded');
    }

    const soldiers = await SoldierModel.find();
    if (soldiers.length === 0) {
      await SoldierModel.deleteMany({});
      await SoldierModel.insertMany(soldierDefault);
      await SoldierModel.insertMany(soldierAdded);
      console.log('soldiers seeded');
    }

    const memorials = await MemorialModel.find();
    if (memorials.length === 0) {
      await MemorialModel.deleteMany({});
      await MemorialModel.insertMany(memorialDefault);
      await MemorialModel.insertMany(memorialAdded);
      console.log('memorials seeded');
    }

    const users = await UserModel.find();
    if (users.length === 0) {
      await UserModel.deleteMany({});
      await UserModel.insertMany(userDefault);
      console.log('users seeded');
    }
  };

  seedDB().then(() => {
    mongoose.connection.close();
  });
};

// npx ts-node <file name> used to run this file
