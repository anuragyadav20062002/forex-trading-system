/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException, ConflictException  } from '@nestjs/common';
import { SignUpDto } from '../dtos/sign-up.dto';
import { SignInDto } from '../dtos/sign-in.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService // Inject JwtService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User | undefined> {
    const existingUser = await this.userModel.findOne({ email: signUpDto.email });
    if (existingUser) {
        throw new ConflictException('User with this email already exists.');
    }
    const newUser = new this.userModel(signUpDto);
    return newUser.save();
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { userId, password } = signInDto;
    const user = await this.userModel.findOne({ userId });

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Payload to include in the JWT
    const payload = { userId: user.userId, sub: user._id };

    return {
      accessToken: this.jwtService.sign(payload), // Generate JWT token
    };
  }
}