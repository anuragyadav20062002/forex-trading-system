/* eslint-disable prettier/prettier */
// app.module.ts
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FxRatesService } from './services/fx-rates.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CacheModule.register({ ttl: 300 }), // cache entries will be stored for 30 seconds
  ],
  controllers: [AppController],
  providers: [AppService, FxRatesService],
})
export class AppModule {}