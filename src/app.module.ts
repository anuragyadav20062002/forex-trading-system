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
// import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
// import { Account, AccountSchema } from './schemas/account.schema';
import { AccountService } from './services/account.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user.module';
import { AccountModule } from './modules/account.module';



@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://anuragyadav20602:B9gnPdrPFyHXi6nV@cluster0.lvan3xr.mongodb.net/'),
    UserModule,
    AccountModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use a strong secret key
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
    UserModule,
    AccountModule,
  ],
  controllers: [AppController, AuthController],
  providers: [FxRatesService, MainService, FxConversionService, AuthService,AccountService],
})
export class AppModule {}