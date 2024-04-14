/* eslint-disable prettier/prettier */
// tests/app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, UnauthorizedException, ConflictException } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MockJwtAuthGuard } from './mocks/jwt-auth.guard';
import { JwtAuthGuard } from './../src/auth/jwt-auth.guard';
import { FxRatesService } from './../src/services/fx-rates.service';
import { mockFxRatesService } from './mocks/fx-rates.service';
import { AuthService } from './../src/services/auth.service';
import { FxConversionService } from '../src/services/fx-conversion.service';
import { mockFxConversionService } from './mocks/fx-conversion.service';

// Mock setup for FxRatesService
// jest.mock('../src/services/fx-rates.service', () => ({
//   getLatestRates: jest.fn().mockResolvedValue({
//     quoteId: "8d0adfca-d91e-4f01-87d4-1e5df7813218",
//     expiry_at: "2024-04-13110:54:30.0052",
//   }),
//   fetchRates: jest.fn().mockResolvedValue({
//     quoteId: "8d0adfca-d91e-4f01-87d4-1e5df7813218",
//     expiry_at: "2024-04-13110:54:30.0052",
//     rates: [
//       { forexPair: "USD/INR", exchangeRateValue: "83.52000000" },
//       { forexPair: "USD/EUR", exchangeRateValue: "0.93930000" },
//       { forexPair: "USD/GBP", exchangeRateValue: "0.80310000" },
//       { forexPair: "USD/CHF", exchangeRateValue: "0.91390000" },
//       { forexPair: "USD/AUD", exchangeRateValue: "1.54630000" },
//       { forexPair: "USD/CAD", exchangeRateValue: "1.37720000" },
//     ],
//   }), // Adjust based on expected behavior
//   // Add other mocked methods if needed
// }));

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideGuard(JwtAuthGuard)
    .useClass(MockJwtAuthGuard) // Use the mock guard
    .overrideProvider(FxRatesService)
    .useValue(mockFxRatesService) // Use the mock service
    .overrideProvider(FxConversionService)
    .useValue(mockFxConversionService) // Use the mock service
    .overrideProvider(AuthService)
    .useValue({
      signUp: jest.fn().mockImplementation((dto) => {
        if (dto.email === 'existing@example.com') {
          throw new ConflictException('User with this email already exists.');
        }
        return Promise.resolve({ id: 'a-unique-id', ...dto });
      }),
      signIn: jest.fn().mockImplementation((dto) => {
        if (dto.email !== 'test@example.com' || dto.password !== 'correct-password') {
          throw new UnauthorizedException('Invalid credentials');
        }
        return Promise.resolve({ accessToken: 'mock-access-token' });
      }),
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/sign-up (POST) success', async () => {
    const signUpDto = {
      userId: 'testuser',
      email: 'test@example.com',
      password: 'password',
    };

    await request(app.getHttpServer())
      .post('/sign-up')
      .send(signUpDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining({
          userId: signUpDto.userId,
          email: signUpDto.email,
        }));
      });
  });

  it('/sign-up (POST) user already exists', async () => {
    const signUpDto = {
      userId: 'existinguser',
      email: 'existing@example.com',
      password: 'password',
    };

    await request(app.getHttpServer())
      .post('/sign-up')
      .send(signUpDto)
      .expect(409)
      .expect((res) => {
        expect(res.body.message).toContain('User with this email already exists.');
      });
  });

  it('/sign-in (POST) success', async () => {
    const signInDto = {
      email: 'test@example.com',
      password: 'correct-password',
    };

    await request(app.getHttpServer())
      .post('/sign-in')
      .send(signInDto)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('accessToken', 'mock-access-token');
      });
  });

  it('/sign-in (POST) invalid credentials', async () => {
    const signInDto = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    await request(app.getHttpServer())
      .post('/sign-in')
      .send(signInDto)
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toContain('Invalid credentials');
      });
  });

  it('/fx-conversion (POST) should convert currency', async () => {
    const conversionRequestDto = {
      quoteId: "8d0adfca-d91e-4f01-87d4-1e5df7813218",
      fromCurrency: "USD",
      toCurrency: "INR",
      amount: 100,
    };

    await request(app.getHttpServer())
      .post('/fx-conversion')
      .send(conversionRequestDto)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining({
          convertedAmount: expect.any(Number),
          currency: conversionRequestDto.toCurrency,
        }));
      });
  });

  // Additional tests for other endpoints can be added here

  afterAll(async () => {
    await app.close();
  });
});
