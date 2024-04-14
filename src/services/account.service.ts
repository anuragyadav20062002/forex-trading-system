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

  async topUp(userId: string, topUpDto: TopUpDto): Promise<{ currency: string; amount: number; }> {
    const { currency, amount } = topUpDto;
    let updatedAccount;
  
    const account = await this.accountModel.findOne({ user: userId, currency });
  
    if (account) {
      account.balance += amount;
      updatedAccount = await account.save();
    } else {
      const newAccount = new this.accountModel({
        user: userId,
        currency,
        balance: amount,
      });
      updatedAccount = await newAccount.save();
    }
  
    // Return the currency and top-up amount
    return {
      currency: updatedAccount.currency,
      amount: amount, // This is the top-up amount, not the updated balance
    };
  }

  async getBalances(userId: string): Promise<Record<string, number>> {
    const accounts = await this.accountModel.find({ user: userId });
    const balances = accounts.reduce((acc, account) => {
      acc[account.currency] = account.balance;
      return acc;
    }, {});

    return balances;
  }
  
}

