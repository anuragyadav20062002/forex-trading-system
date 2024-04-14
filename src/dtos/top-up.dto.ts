/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { IsSpecificCurrency } from './custom-decorator'; // Adjust the import path as necessary

export class TopUpDto {
  @IsSpecificCurrency({ message: 'Currency must be one of the specified types.' })
  @IsNotEmpty()
  currency: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  amount: number;
}
