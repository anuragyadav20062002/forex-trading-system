/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { FxRatesService } from './fx-rates.service';
import { ConversionRequestDto } from '../dtos/conversion-request.dto';

@Injectable()
export class FxConversionService {
  constructor(private fxRatesService: FxRatesService) {}

  async convertCurrency(conversionRequest: ConversionRequestDto): Promise<{ convertedAmount: number; currency: string }> {
    // Assume that conversionRequest has already been validated by DTO class

    const { quoteId, fromCurrency, toCurrency, amount } = conversionRequest;

    // Fetch the latest rates and check for expiry
    const latestRates = this.fxRatesService.getLatestRates();
    const expiryDate = new Date(latestRates.expiry_at);
    if (!latestRates || new Date() > new Date(expiryDate.getTime() + 30000)) {
      await this.fxRatesService.fetchRates();
    }

    // Perform the currency conversion
    const rate = this.fxRatesService.getRate(quoteId)?.rates.find(rate => rate.forexPair === `${fromCurrency}/${toCurrency}`);
    if (!rate) {
      throw new NotFoundException('Rate not found for the specified currency pair');
    }

    const convertedAmount = amount * parseFloat(rate.exchangeRateValue);
    return { convertedAmount, currency: toCurrency };
  }
}
