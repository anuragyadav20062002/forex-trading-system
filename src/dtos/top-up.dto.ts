/* eslint-disable prettier/prettier */
// src/dtos/top-up.dto.ts
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { IsSpecificCurrency } from './custom-decorator'; // Adjust the import path as necessary
import { ApiProperty } from '@nestjs/swagger';

export class TopUpDto {
  @ApiProperty({ description: 'Currency of the amount to top up', example: 'USD' })
  @IsSpecificCurrency({ message: 'Currency must be one of the specified types.' })
  @IsNotEmpty()
  currency: string;

  @ApiProperty({ description: 'Amount to top up', example: 100, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  amount: number;
}
