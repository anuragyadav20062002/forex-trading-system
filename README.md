
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
 <li>
    `/api    - Get Swagger Docs to all API endpoints.</li>
<li>
 `/sign-in` - Request Body- {
    "userId":string,
    "password": string
}</li>
<li>
 `/sign-up` - Request Body {
    "userId":string,
    "email":string,
    "password": string
}
</li>
<li>`/accounts/topup` - Request Body - { "currency": string, "amount": number }</li>
<li>`/accounts/balance` - Get Request</li>
<li>`/fx-rates` - Get Request</li>
<li>`/fx-conversion` - Request Body - { "quoteId": quote id from fx-rates API, "fromCurrency": string,
"toCurrency": string, "amount": number }</li>
</ul>


## Steps
<ul>
<li>Firstly Go to `/sign-up` to create an account - Remember your userId and Password</li>
 <li>Then go to `/sign-in` and Sign-in using your credentials and save the access token generated in response.</li>
 <li>After this to access `/accounts/topup` you have to put the access token as Bearer Token in Postman for Authorization</li>
 <li>Same for `/accounts/balance`</li>
 <li>Go to `/fx-rates` to fetch live exchange rates which will be stored in cache memory, save the quoteId which comes in the response along with expiration time.</li>
 <li>Go to `/fx-conversion` in the request body paste the saved quoteId along with the Target and Base Currency to Get the exchange rate</li>
</ul>

## Drive Link

https://drive.google.com/file/d/1_kre3Pb9tOKUGOvJNO_FwjRiWoVomoWA/view?usp=sharing





