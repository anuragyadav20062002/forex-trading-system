/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConversionRequestDto {
  @IsNotEmpty()
  @IsString()
  quoteId: string;

  @IsNotEmpty()
  @IsString()
  fromCurrency: string;

  @IsNotEmpty()
  @IsString()
  toCurrency: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}