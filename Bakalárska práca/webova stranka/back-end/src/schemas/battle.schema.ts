import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type BattleDocument = Battle & Document;

@Schema() //schema for user table in mongodb
export class Battle {
  @Prop({ required: true })
  GPS: string;

  @Prop()
  name: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;

  @Prop()
  result: string;

  @Prop()
  austriaHungaryArmy: string;

  @Prop()
  austriaHungaryArmyNumber: number;

  @Prop()
  russianArmyNumber: number;

  @Prop()
  russianArmy: string;

  @Prop()
  note: string;

  @Prop()
  state: string;

  @Prop()
  addedBy: string;
}

export const BattleSchema = SchemaFactory.createForClass(Battle);

export const BattleModel = mongoose.model('Battle', BattleSchema);
