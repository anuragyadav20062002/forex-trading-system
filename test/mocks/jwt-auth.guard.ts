/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class MockJwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Simulate a signed-in user by attaching a dummy user object to the request
    request.user = { userId: 'dummyUserId' };
    return true; // Always allow access
  }
}
