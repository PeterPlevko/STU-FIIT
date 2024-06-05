import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
export type SoldierDocument = Soldier & Document;

@Schema()
export class Soldier {
  @Prop({ required: true })
  name: string;

  @Prop()
  dateOfDeath: string;

  @Prop()
  dateOfBirth: string;

  @Prop()
  story: string;

  @Prop()
  state: string;

  @Prop()
  addedBy: string;
}

export const SoldierSchema = SchemaFactory.createForClass(Soldier);

export const SoldierModel = mongoose.model('Soldier', SoldierSchema);
