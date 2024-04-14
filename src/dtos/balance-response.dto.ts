/* eslint-disable prettier/prettier */
// src/dtos/balance-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class BalanceResponseDto {
    @ApiProperty({
        description: 'A record of balances by currency',
        example: { "USD": 100, "EUR": 150 },
        type: 'object',
    })
    balances: Record<string, number>;
}
