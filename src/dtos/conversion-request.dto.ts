/* eslint-disable prettier/prettier */
// src/dtos/conversion-request.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConversionRequestDto {
  @ApiProperty({ example: '12345', description: 'Unique quote ID' })
  @IsNotEmpty()
  @IsString()
  quoteId: string;

  @ApiProperty({ example: 'USD', description: 'Currency from which to convert' })
  @IsNotEmpty()
  @IsString()
  fromCurrency: string;

  @ApiProperty({ example: 'EUR', description: 'Currency to which to convert' })
  @IsNotEmpty()
  @IsString()
  toCurrency: string;

  @ApiProperty({ example: 100, description: 'Amount to convert' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
