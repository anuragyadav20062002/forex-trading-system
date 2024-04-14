/* eslint-disable prettier/prettier */
// src/schemas/account.schema.ts
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';

export type AccountDocument = Account & mongoose.Document;

@Schema()
export class Account {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  balance: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
