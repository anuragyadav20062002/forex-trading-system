/* eslint-disable prettier/prettier */
// src/services/account.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from '../schemas/account.schema';
import { TopUpDto } from '../dtos/top-up.dto';

@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>) {}

  async topUp(userId: string, topUpDto: TopUpDto): Promise<Account> {
    const { currency, amount } = topUpDto;
    const account = await this.accountModel.findOne({ user: userId, currency });

    if (account) {
      account.balance += amount;
      return account.save();
    } else {
      const newAccount = new this.accountModel({
        user: userId,
        currency,
        balance: amount,
      });
      return newAccount.save();
    }
  }
}
