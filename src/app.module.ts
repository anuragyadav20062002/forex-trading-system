/* eslint-disable prettier/prettier */
// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthController } from './auth.controller';
import { FxRatesService } from './services/fx-rates.service';
import { MainService } from './services/main.service';
import { FxConversionService } from './services/fx-conversion.service';
import { AuthService } from './services/auth.service';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://anuragyadav20602:B9gnPdrPFyHXi6nV@cluster0.lvan3xr.mongodb.net/'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use a strong secret key
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [FxRatesService, MainService, FxConversionService, AuthService],
})
export class AppModule {}