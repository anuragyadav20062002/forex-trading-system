/* eslint-disable prettier/prettier */
// tests/app.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AccountService } from '../src/services/account.service';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController', () => {
  let app: INestApplication;
  let appController: AppController;
  let accountService: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideGuard(JwtAuthGuard)
    .useValue({ canActivate: () => true }) // Mock JwtAuthGuard to always allow access
    .compile();

    appController = module.get<AppController>(AppController);
    accountService = module.get<AccountService>(AccountService);

    app = module.createNestApplication();
    await app.init();
  });

  describe('topUpAccount', () => {
    it('should top up the account with the given amount and currency', async () => {
      const topUpDto = { currency: 'USD', amount: 100 };
      const userId = 'user-id-123';

      // Spy on the topUp method to simulate its behavior
      const topUpSpy = jest.spyOn(accountService, 'topUp').mockResolvedValue({
        currency: topUpDto.currency,
        amount: topUpDto.amount,
      });

      const result = await appController.topUpAccount({ userId } as any, topUpDto);
      expect(result).toEqual({
        currency: topUpDto.currency,
        amount: topUpDto.amount,
      });
      expect(topUpSpy).toHaveBeenCalledWith(userId, topUpDto);
    });
  });

  describe('getBalances', () => {
    it('should retrieve the balances for the user', async () => {
      const userId = 'user-id-123';
      const balances = { USD: 1000, EUR: 500 };

      // Spy on the getBalances method to simulate its behavior
      const getBalancesSpy = jest.spyOn(accountService, 'getBalances').mockResolvedValue(balances);

      const result = await appController.getBalances({ userId } as any);
      expect(result).toEqual({ balances });
      expect(getBalancesSpy).toHaveBeenCalledWith(userId);
    });
  });
});
