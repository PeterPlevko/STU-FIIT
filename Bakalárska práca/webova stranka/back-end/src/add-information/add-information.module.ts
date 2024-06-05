import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddInformationController } from './controllers/add-information.controller';
import { AddInformationService } from './services/add-information.service';
import { Memorial, MemorialSchema } from 'src/schemas/memorial.schema';
import { Cemetery, CemeterySchema } from 'src/schemas/cemetery.schema';
import { Battle, BattleSchema } from 'src/schemas/battle.schema';
import { WarCamp, WarCampSchema } from 'src/schemas/warCamp.schema';
import { Soldier, SoldierSchema } from 'src/schemas/soldier.schema';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/schemas/user.schema';
@Module({
  providers: [AddInformationService],
  imports: [
    HttpModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: Memorial.name, schema: MemorialSchema },
      { name: Cemetery.name, schema: CemeterySchema },
      { name: WarCamp.name, schema: WarCampSchema },
      { name: Soldier.name, schema: SoldierSchema },
      { name: Battle.name, schema: BattleSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AddInformationController],
})
export class AddInformationModule {}
