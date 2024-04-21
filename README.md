`
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

## Set Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

```bash
API_KEY='Your_Alphavantage_API_Key'
JWT_SECRET=anystring
MONGO_DB_URI='mongodb+srv://<username>:<password>@cluster0.lvan3xr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
```

## api endpoints

- `/api` - Get Swagger Docs for all API endpoints.
- `/sign-in` - 
Request Body:
```
 { 
     "userId":string, 
     "password": string 
 }
 ```

- `/sign-up` - 

Request Body:
```
{ 
    "userId":string, 
    "email":string, 
    "password": string 
}
```
- `/accounts/topup` - 
Request Body:
```
{ "currency": string, "amount": number }
```
- `/accounts/balance` - Get Request

- `/fx-rates` - Get Request

- `/fx-conversion` - 
Request Body:
```
{ 
    "quoteId": quote id from fx-rates API, 
    "fromCurrency": string, 
    "toCurrency": string, 
    "amount": number 
}
```


## Steps
1. Firstly, go to `"/sign-up"` to create an account - Remember your userId and Password.
2. Then go to `"/sign-in"` and sign in using your credentials and save the access token generated in response.
3. After this, to access `"/accounts/topup"`, you have to put the access token as Bearer Token in Postman for Authorization.
4. Same for `"/accounts/balance"`.
5. Go to `"/fx-rates"` to fetch live exchange rates which will be stored in cache memory, save the quoteId which comes in the response along with expiration time.
6. Go to `"/fx-conversion"` in the request body paste the saved quoteId along with the Target and Base Currency to get the exchange rate.

## Postman Workflow

https://youtu.be/OOeI6PDjuIY?si=p9q5u2al4EXwoPbz





