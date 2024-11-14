import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    NestJwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
    PrismaModule,
  ],
  providers: [JwtService, JwtStrategy],
  exports: [JwtService],
})
export class JwtModule {}
