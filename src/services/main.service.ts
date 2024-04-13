/* eslint-disable prettier/prettier */
// src/services/main.service.ts
import { Injectable } from '@nestjs/common';
import { FxRatesService } from './fx-rates.service';

@Injectable()
export class MainService {
  constructor(private fxRatesService: FxRatesService) {}

  async getQuoteIdAndExpiry() {
    const latestRates = this.fxRatesService.getLatestRates();
    if (!latestRates) {
      throw new Error('No rates available');
    }
    return {
      quoteId: latestRates.quoteId,
      expiry_at: latestRates.expiry_at,
    };
  }
}
