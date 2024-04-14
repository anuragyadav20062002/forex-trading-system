/* eslint-disable prettier/prettier */
// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FxRatesService } from './services/fx-rates.service';
import { MainService } from './services/main.service';
import { FxConversionService } from './services/fx-conversion.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [FxRatesService, MainService, FxConversionService],
})
export class AppModule {}
