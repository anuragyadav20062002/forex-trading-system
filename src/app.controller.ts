/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { FxRatesService } from './services/fx-rates.service';
import { ConversionRequestDto } from './dtos/conversion-request.dto';
import { FxConversionService } from './services/fx-conversion.service';
import { AccountService } from './services/account.service'; // Make sure to import AccountService
import { TopUpDto } from './dtos/top-up.dto'; // Import the DTO for top-up
import { JwtAuthGuard } from './auth/jwt-auth.guard'; // Import JwtAuthGuard for authentication
import { BalanceResponseDto } from './dtos/balance-response.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly fxRatesService: FxRatesService,
    private readonly fxConversionService: FxConversionService,
    private readonly accountService: AccountService 
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
  async convertCurrency(@Body() conversionRequest: ConversionRequestDto, @Res() response: Response) {
    try {
      const conversionResult = await this.fxConversionService.convertCurrency(conversionRequest);
      return response.status(HttpStatus.OK).send(conversionResult);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send({ message: error.message });
    }
  }

  @Post('/accounts/topup')
  @UseGuards(JwtAuthGuard) // Protect the endpoint with JWT authentication
  async topUpAccount(@Req() req, @Body() topUpDto: TopUpDto) {
    // Assuming the user object is attached to the request by JwtAuthGuard
    const userId = req.userId;
    return this.accountService.topUp(userId, topUpDto);
  }

  @Get('/accounts/balance')
  @UseGuards(JwtAuthGuard) // Protect the endpoint with JWT authentication
  async getBalances(@Req() req): Promise<BalanceResponseDto> {
    
    const userId = req.userId;
    const balances = await this.accountService.getBalances(userId);
    return { balances };
  }

}
