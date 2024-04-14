/* eslint-disable prettier/prettier */
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsSpecificCurrency(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isSpecificCurrency',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const allowedCurrencies = ['INR', 'EUR', 'GBP', 'CHF', 'AUD', 'CAD', 'NZD', 'HKD', 'SGD', 'JPY', 'USD'];
          return typeof value === 'string' && allowedCurrencies.includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be one of the following currencies: INR, EUR, GBP, CHF, AUD, CAD, NZD, HKD, SGD, JPY, USD`;
        }
      }
    });
  };
}
