import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
export type CemeteryDocument = Cemetery & Document;

@Schema() //schema for user table in mongodb
export class Cemetery {
  @Prop()
  cemeteryType: string;

  @Prop()
  nationality: string[];

  @Prop()
  reasonOfDeath: string[];

  @Prop()
  dateOfDeath: string[];

  @Prop()
  numberOfGraves: number;

  @Prop()
  numberOfBurried: number;

  @Prop({ required: true })
  GPS: string;

  @Prop()
  state: string;

  @Prop()
  addedBy: string;
}

export const CemeterySchema = SchemaFactory.createForClass(Cemetery);

export const CemeteryModel = mongoose.model('Cemetery', CemeterySchema);
