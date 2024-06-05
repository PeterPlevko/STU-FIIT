import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Battle, BattleSchema } from 'src/schemas/battle.schema';
import { Cemetery, CemeterySchema } from 'src/schemas/cemetery.schema';
import { Memorial, MemorialSchema } from 'src/schemas/memorial.schema';
import { Soldier, SoldierSchema } from 'src/schemas/soldier.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { WarCamp, WarCampSchema } from 'src/schemas/warCamp.schema';
import { AdminController } from './controllers/admin/admin.controller';
import { AdminService } from './services/admin/admin.service';

@Module({
  providers: [AdminService],
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
  controllers: [AdminController],
})
export class AdminModule {}
