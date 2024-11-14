import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/auth/jwt/jwt.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.prisma.user.create({
        data: { email, password: hashedPassword },
        select: { id: true, email: true },
      });
      return user;
    } catch (error) {
      throw new HttpException(
        'Failed to register user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await this.jwtService.generateToken(user.id, user.email);

      return {
        status: 200,
        message: 'Login successful',
        userId: user.id,
        token: token,
      };
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async getAllUsers() {
    try {
      return this.prisma.user.findMany({
        select: { id: true, email: true },
      });
    } catch (error) {
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  async getUserById(userId: number) {
    try {
      return this.prisma.user.findUnique({
        where: { id: +userId },
        select: { email: true, id: true, createdAt: true },
      });
    } catch (error) {
      throw new UnauthorizedException(HttpStatus.UNAUTHORIZED);
    }
  }
}
