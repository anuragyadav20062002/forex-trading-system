/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class FxRatesService {
  private exchangeRates: Map<string, number> = new Map();

  constructor() {
    this.fetchRates(); // Initial fetch
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  private async fetchRates() {
    const baseCurrency = 'USD';
    const targetCurrencies = ['INR', 'EUR', 'GBP', 'CHF', 'AUD', 'CAD', 'NZD', 'HKD', 'SGD', 'JPY'];
  
    for (const targetCurrency of targetCurrencies) {
      const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${baseCurrency}&to_currency=${targetCurrency}&apikey=BOD69ENQORQQHQ6I`;
  
      try {
        const response = await axios.get(url);
        const entries = Object.entries(response.data['Realtime Currency Exchange Rate'] || {});
        // console.log(entries)
        for (const [key, value] of entries) {
          if (key.endsWith('5. Exchange Rate')) {
            const exchangeRateKey = `${baseCurrency}_${targetCurrency}`;
            const exchangeRateValue = parseFloat(value as string);
            this.exchangeRates[exchangeRateKey] = exchangeRateValue;
            break;
          }
        }
      } catch (error) {
        console.error(`Error fetching rates for ${targetCurrency}: ${error.message}`);
      }
    }
  }

  getAllRates(): Map<string, number> {
    return this.exchangeRates;
  }
}