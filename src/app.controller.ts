/* eslint-disable prettier/prettier */


import { Controller, Get } from '@nestjs/common';
import { FxRatesService } from './services/fx-rates.service';

@Controller('fx-rates')
export class AppController {
  constructor(private readonly fxRatesService: FxRatesService) {}

  @Get()
  getRates() {
    return this.fxRatesService.getAllRates();
  }
}