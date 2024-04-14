/* eslint-disable prettier/prettier */
// tests/mocks/fx-conversion.service.ts
import { ConversionRequestDto } from '../../src/dtos/conversion-request.dto';
import { NotFoundException } from '@nestjs/common';

export const mockFxConversionService = {
  convertCurrency: jest.fn().mockImplementation((conversionRequest: ConversionRequestDto) => {
    const { quoteId, fromCurrency, toCurrency, amount } = conversionRequest;

    // Sample data as provided
    const sampleData = {
      quoteId: "8d0adfca-d91e-4f01-87d4-1e5df7813218",
      expiry_at: "2024-04-13110:54:30.0052",
      rates: [
        { forexPair: "USD/INR", exchangeRateValue: "83.52000000" },
        { forexPair: "USD/EUR", exchangeRateValue: "0.93930000" },
        { forexPair: "USD/GBP", exchangeRateValue: "0.80310000" },
        { forexPair: "USD/CHF", exchangeRateValue: "0.91390000" },
        { forexPair: "USD/AUD", exchangeRateValue: "1.54630000" },
        { forexPair: "USD/CAD", exchangeRateValue: "1.37720000" },
      ],
    };

    // Check if the quoteId matches and the rates are not expired
    const expiryDate = new Date(sampleData.expiry_at);
    if (quoteId !== sampleData.quoteId || new Date() > new Date(expiryDate.getTime() + 30000)) {
      throw new NotFoundException('Rate not found or expired for the specified quoteId');
    }

    // Find the rate for the requested currency pair
    const rate = sampleData.rates.find(rate => rate.forexPair === `${fromCurrency}/${toCurrency}`);
    if (!rate) {
      throw new NotFoundException('Rate not found for the specified currency pair');
    }

    // Perform the currency conversion
    const convertedAmount = amount * parseFloat(rate.exchangeRateValue);
    return Promise.resolve({ convertedAmount, currency: toCurrency });
  }),
};
