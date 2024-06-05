import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
export type MemorialDocument = Memorial & Document;

@Schema() //schema for user table in mongodb
export class Memorial {
  @Prop()
  name: string;

  @Prop()
  municipalityDescription: string;

  @Prop()
  location: string;

  @Prop({ required: true })
  GPS: string;

  @Prop()
  photoDescription: string;

  @Prop()
  deceasedList: string[];

  @Prop()
  imagePath: string;

  @Prop()
  dateOfBirth: string[];

  @Prop()
  dateOfDeath: string[];

  @Prop()
  state: string;

  @Prop()
  addedBy: string;
}

export const MemorialSchema = SchemaFactory.createForClass(Memorial);

export const MemorialModel = mongoose.model('Memorial', MemorialSchema);
