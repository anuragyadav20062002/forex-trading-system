/* eslint-disable prettier/prettier */
// src/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Account } from './account.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true,unique: true})
  userId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Account' }] })
  accounts: Account[];
}

export const UserSchema = SchemaFactory.createForClass(User);
