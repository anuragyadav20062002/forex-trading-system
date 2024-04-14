/* eslint-disable prettier/prettier */
// src/app.controller.ts
// src/app.controller.ts
import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { FxRatesService } from './services/fx-rates.service';
import { ConversionRequestDto } from './dtos/conversion-request.dto';
import { FxConversionService } from './services/fx-conversion.service';

@Controller()
export class AppController {
  constructor(
    private readonly fxRatesService: FxRatesService,
    private readonly fxConversionService: FxConversionService
  ) {}
  

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

  @Post('/fx-conversion')
  async convertCurrency(@Body() conversionRequest: ConversionRequestDto) {
    try {
      const conversionResult = await this.fxConversionService.convertCurrency(conversionRequest);
      return conversionResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
