/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FxRatesService } from './services/fx-rates.service';
import { FxConversionService } from './services/fx-conversion.service';
import { AccountService } from './services/account.service';

describe('AppController', () => {
  let appController: AppController;

  // Create a mock of FxConversionService with jest.fn()
  const mockFxConversionService = {
    convertCurrency: jest.fn(),
    fetchRates: jest.fn(),
    getRate: jest.fn(),
    // Add other methods as needed
  };

  const mockFxRatesService = {
    fetchRates: jest.fn(),
    getRate: jest.fn(),
    getLatestRates: jest.fn()
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      // Include the mock in the providers array
      providers: [
        AppService,
        AccountService,
        { provide: FxConversionService, useValue: mockFxConversionService },
        {provide: FxRatesService, useValue: mockFxRatesService},
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getRates', () => {
    it('should return the exchange rate for USD', () => {
      // Mock the getLatestRates method to return a value
      // jest.spyOn(appController, 'getFxRates').mockImplementation(() => ({
      //   quoteId: 'some-quote-id',
      //   expiry_at: '2024-04-13T13:09:06.534Z',
      // }));

      // expect(appController.getFxRates()).toEqual({
      //   quoteId: 'some-quote-id',
      //   expiry_at: expect.any(Date.toString),
      // });
    });
  });
});
