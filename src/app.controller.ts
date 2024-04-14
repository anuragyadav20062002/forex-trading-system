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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly fxRatesService: FxRatesService,
    private readonly fxConversionService: FxConversionService,
    private readonly accountService: AccountService 
  ) {}
  
  @ApiResponse({description:"Welcome To Forex Trading System"})
  @Get()
  getWelcomeMessage() {
    return 'Hello welcome to Forex trading system';
  }
  
  @ApiOperation({ summary: 'Get FX rates' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns the quoteId and expiry of that quoteId' })
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
  
  @ApiOperation({ summary: 'Perform FX conversion' })
  @ApiBody({ type: ConversionRequestDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Performs the currency conversion and returns the result.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid request data.' })
  @Post('/fx-conversion')
  async convertCurrency(@Body() conversionRequest: ConversionRequestDto, @Res() response: Response) {
    try {
      const conversionResult = await this.fxConversionService.convertCurrency(conversionRequest);
      return response.status(HttpStatus.OK).send(conversionResult);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send({ message: error.message });
    }
  }

  @ApiOperation({ summary: 'Top up account' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: TopUpDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Account topped up successfully.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @Post('/accounts/topup')
  @UseGuards(JwtAuthGuard) // Protect the endpoint with JWT authentication
  async topUpAccount(@Req() req, @Body() topUpDto: TopUpDto) {
    // Assuming the user object is attached to the request by JwtAuthGuard
    const userId = req.userId;
    return this.accountService.topUp(userId, topUpDto);
  }

  @ApiOperation({ summary: 'Get account balances' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'Balances retrieved successfully.', type: BalanceResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @Get('/accounts/balance')
  @UseGuards(JwtAuthGuard) // Protect the endpoint with JWT authentication
  async getBalances(@Req() req): Promise<BalanceResponseDto> {
    
    const userId = req.userId;
    const balances = await this.accountService.getBalances(userId);
    return { balances };
  }

}
