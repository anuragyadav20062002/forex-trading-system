/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString,MinLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}