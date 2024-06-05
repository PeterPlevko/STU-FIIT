import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Battle, BattleSchema } from 'src/schemas/battle.schema';
import { Cemetery, CemeterySchema } from 'src/schemas/cemetery.schema';
import { Memorial, MemorialSchema } from 'src/schemas/memorial.schema';
import { Soldier, SoldierSchema } from 'src/schemas/soldier.schema';
import { WarCamp, WarCampSchema } from 'src/schemas/warCamp.schema';
import { ShowInformationController } from './controllers/show-information.controller';
import { ShowInformationService } from './services/show-information.service';

@Module({
  providers: [ShowInformationService],
  imports: [
    MongooseModule.forFeature([
      { name: Cemetery.name, schema: CemeterySchema },
      { name: Battle.name, schema: BattleSchema },
      { name: Memorial.name, schema: MemorialSchema },
      { name: WarCamp.name, schema: WarCampSchema },
      { name: Soldier.name, schema: SoldierSchema },
    ]),
  ],
  controllers: [ShowInformationController],
})
export class ShowInformationModule {}
