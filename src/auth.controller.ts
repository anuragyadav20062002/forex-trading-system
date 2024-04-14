/* eslint-disable prettier/prettier */
// src/auth.controller.ts
import { Body, Controller, Post, BadRequestException, Res, HttpStatus } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthService } from './services/auth.service';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.signUp(signUpDto);
    if (!user) {
      throw new BadRequestException('User with this email already exists.');
    }
    return user;
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto, @Res() response: Response) {
    try {
        const { accessToken } = await this.authService.signIn(signInDto);
        // Set the cookie with the access token
        response.cookie('access_token', accessToken, {
          httpOnly: true,
          // secure: true, // Uncomment if using HTTPS
        });
        // Send the response with the access token in the body as well
        return response.status(HttpStatus.OK).send({ accessToken });
      } catch (error) {
        // Handle error
        return response.status(HttpStatus.UNAUTHORIZED).send({ message: error.message });
      }
    }
}
