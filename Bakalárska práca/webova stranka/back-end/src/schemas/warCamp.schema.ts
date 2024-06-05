import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type WarCampDocument = WarCamp & Document;

@Schema()
export class WarCamp {
  @Prop()
  campType: string;

  @Prop({ required: true })
  GPS: string;

  @Prop()
  mainCaptiveNationality: string;

  @Prop()
  numberOfCaptives: number;

  @Prop()
  state: string;

  @Prop()
  equipment: string[];

  @Prop()
  addedBy: string;
}

export const WarCampSchema = SchemaFactory.createForClass(WarCamp);

export const WarCampModel = mongoose.model('WarCamp', WarCampSchema);
