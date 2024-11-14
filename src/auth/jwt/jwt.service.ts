import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  generateToken(userId: number, email: string) {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }
}
