import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Memorial, MemorialSchema } from 'src/schemas/memorial.schema';
import { Cemetery, CemeterySchema } from 'src/schemas/cemetery.schema';
import { Battle, BattleSchema } from 'src/schemas/battle.schema';
import { ConfirmInformationService } from './services/confirm-information.service';
import { ConfirmInformationController } from './controllers/confirm-information.controller';
import { WarCamp, WarCampSchema } from 'src/schemas/warCamp.schema';
import { Soldier, SoldierSchema } from 'src/schemas/soldier.schema';
import { AuthModule } from 'src/auth/auth.module';
import { AppModule } from 'src/app.module';
import { User, UserSchema } from 'src/schemas/user.schema';
@Module({
  providers: [ConfirmInformationService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Cemetery.name, schema: CemeterySchema },
      { name: Battle.name, schema: BattleSchema },
      { name: Memorial.name, schema: MemorialSchema },
      { name: WarCamp.name, schema: WarCampSchema },
      { name: Soldier.name, schema: SoldierSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ConfirmInformationController],
})

//     MongooseModule.forFeature([
//       { name: Memorial.name, schema: MemorialSchema },
//       { name: Cemetery.name, schema: CemeterySchema },
//       { name: Battle.name, schema: BattleSchema },
//     ]),];
export class ConfirmInformationModule {}

// @Module({
//     providers: [AddInformationService],
//     imports: [
//       MongooseModule.forFeature([
//         { name: Memorial.name, schema: MemorialSchema },
//         { name: Cemetery.name, schema: CemeterySchema },
//         { name: Battle.name, schema: BattleSchema },
//       ]),
//     ],
//     controllers: [AddInformationController],
//   })
//   export class AddInformationModule {}
