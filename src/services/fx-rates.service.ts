/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FxRatesService {
  private exchangeRates: Map<string, { rates: Array<{ forexPair: string; exchangeRateValue: string }>; expiry_at: Date }> = new Map();

  constructor() {
    this.fetchRates(); // Initial fetch
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  private async fetchRates() {
    const baseCurrency = 'USD';
    const targetCurrencies = ['INR', 'EUR', 'GBP', 'CHF', 'AUD', 'CAD', 'NZD', 'HKD', 'SGD', 'JPY'];
    const quoteId = uuidv4(); // Generate a unique quoteId for this set of rates
    const expiry_at = new Date(new Date().getTime() + 30000); // Set expiry 30 seconds from now
    const ratesArray: Array<{ forexPair: string; exchangeRateValue: string }> = [];

    for (const targetCurrency of targetCurrencies) {
      const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${baseCurrency}&to_currency=${targetCurrency}&apikey=7FWJYDRGL1V9R6J8`;

      try {
        const response = await axios.get(url);
        const data = response.data["Realtime Currency Exchange Rate"] || {};
        // console.log(response.data)
        if (data) {
          const forexPair = `${baseCurrency}/${targetCurrency}`;
          const exchangeRateValue = data['5. Exchange Rate'].toString();
          ratesArray.push({ forexPair, exchangeRateValue });
          // console.log(ratesArray)

        } else {
          console.error(`Error fetching rates for ${targetCurrency}: Rates data not found`)
        }
      } catch (error) {
        console.error(`Error fetching rates for ${targetCurrency}: ${error.message}`);
      }
    }
    // Store the rates with the quoteId and expiry_at
    this.exchangeRates.set(quoteId, { rates: ratesArray, expiry_at });
  }

  getRate(quoteId: string): { rates: Array<{ forexPair: string; exchangeRateValue: string }>; expiry_at: Date } | undefined {
    return this.exchangeRates.get(quoteId);
  }

  // New method to get the latest quoteId and its rates
  getLatestRates(): { quoteId: string; expiry_at: string; rates: Array<{ forexPair: string; exchangeRateValue: string }> } | undefined {
    let latestEntry: { quoteId: string; expiry_at: Date; rates: Array<{ forexPair: string; exchangeRateValue: string }> } | undefined = undefined;
    this.exchangeRates.forEach((value, key) => {
      if (!latestEntry || value.expiry_at > latestEntry.expiry_at) {
        // Keep latestEntry.expiry_at as a Date for comparison
        latestEntry = { quoteId: key, expiry_at: value.expiry_at, rates: value.rates };
      }
    });
    // Convert expiry_at to string after determining the latest entry
    if (latestEntry) {
      return { ...latestEntry, expiry_at: latestEntry.expiry_at.toISOString() };
    }
    return undefined;
  }
  
}
