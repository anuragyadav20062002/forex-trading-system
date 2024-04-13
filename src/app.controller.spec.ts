/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FxRatesService } from './services/fx-rates.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, FxRatesService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });


  describe('getRates', () => {
    it('should return the exchange rate for USD', () => {
      expect(appController.getRates()).toBe(1.0);
    });
  });
});