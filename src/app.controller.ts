/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */



import { Body, Controller, Get,Post } from '@nestjs/common';
import { FxRatesService } from './services/fx-rates.service';

@Controller('fx-rates')
export class AppController {
  constructor(private readonly fxRatesService: FxRatesService) {}

  @Get()
  getRates() {
    return this.fxRatesService.getLatestRates();
  }

  // @Post('fx-conversion')
  // performFxConversion(@Body() conversionRequest: { quoteId: string; fromCurrency: string; toCurrency: string; amount: number }) {
  //   // Implementation for FX conversion functionality
  //   // This would use the quoteId to ensure the rate is still valid and perform the conversion
  // }
}

