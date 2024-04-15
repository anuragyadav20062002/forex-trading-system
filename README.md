
## Description

 Forex Trading System using Nest.js.Implementing several APIs that allow users to top up their account, fetch live FX conversion rates, perform FX conversions, and check their account balances.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
npm run start:dev
```

## Test

```bash
# This will run both unit and e2e tests
$ npm run test:e2e
```

## Support

After all tests pass, you can check all the routes
Routes
<ul>
 <li>/api - Get Swagger Docs to all API endpoints.</li>
<li>
 /sign-in - Request Body- {
    "userId":string,
    "password": string
}</li>
<li>
 /sign-up - Request Body {
    "userId":string,
    "email":string,
    "password": string
}
</li>
<li>/accounts/topup - Request Body - { "currency": string, "amount": number }</li>
<li>/accounts/balance - Get Request</li>
<li>/fx-rates - Get Request</li>
<li>/fx-conversion - Request Body - { "quoteId": quote id from fx-rates API, "fromCurrency": string,
"toCurrency": string, "amount": number }</li>
</ul>








