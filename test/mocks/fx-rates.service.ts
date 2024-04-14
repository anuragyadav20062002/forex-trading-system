/* eslint-disable prettier/prettier */
export const mockFxRatesService = {
    fetchRates: jest.fn().mockImplementation(() => {

        const rates = {

            quoteId: "8d0adfca-d91e-4f01-87d4-1e5df7813218",
            expiry_at: "2024-04-13110:54:30.0052",
            rates: [

            {forexPair: "USD/INR",
            exchangeRateValue: "83.52000000"},
            {forexPair: "USD/EUR",
            exchangeRateValue: "0.93930000"},
            {forexPair: "USD/GBP",
            exchangeRatevalue: "0.80310000"},
            {forexPair: "USD/CHF",
            exchangeRatevalue: "0.91390000"},
            {forexPair: "USD/AUD",
            exchangeRateValue: "1.54630000"},
            {forexpair: "USD/CAD",
            exchangeRateValue: "1.37720000"}, ]

        }

      return Promise.resolve(rates);
    }),
  };
  