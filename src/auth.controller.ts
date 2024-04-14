/* eslint-disable prettier/prettier */
// src/auth.controller.ts
import { Body, Controller, Post, BadRequestException, Res, HttpStatus } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthService } from './services/auth.service';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({ status: 201, description: 'User successfully signed up.' })
  @ApiResponse({ status: 400, description: 'User with this email already exists.' })
  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.signUp(signUpDto);
    if (!user) {
      throw new BadRequestException('User with this email already exists.');
    }
    return user;
  }

  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiResponse({ status: 200, description: 'User successfully signed in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto, @Res() response: Response) {
    try {
        const { accessToken } = await this.authService.signIn(signInDto);
        response.cookie('access_token', accessToken, {
          httpOnly: true,
        });
        return response.status(HttpStatus.OK).send({ accessToken });
      } catch (error) {
        return response.status(HttpStatus.UNAUTHORIZED).send({ message: error.message });
      }
    }
}
