/* eslint-disable prettier/prettier */
// src/app.controller.ts
// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { FxRatesService } from './services/fx-rates.service';

@Controller()
export class AppController {
  constructor(private readonly fxRatesService: FxRatesService) {}

  @Get()
  getWelcomeMessage() {
    return 'Hello welcome to Forex trading system';
  }

  @Get('fx-rates')
  getFxRates() {
    const latestRates = this.fxRatesService.getLatestRates();
    if (!latestRates) {
      throw new Error('No rates available');
    }
    // Return only quoteId and expiry_at
    return {
      quoteId: latestRates.quoteId,
      expiry_at: latestRates.expiry_at,
    };
  }
}
