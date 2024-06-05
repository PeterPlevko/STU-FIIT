import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  userType: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  surname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel = mongoose.model('User', UserSchema);