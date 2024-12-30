import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/auth/jwt/jwt.service';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getAuthorizationHeader(req: Request) {
    if (req.cookies['Authorization'] === false) {
      return 0;
    }
    return req.cookies['Authorization'];
  }

  async register(email: string, password: string) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: email },
      });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

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
      const token = this.jwtService.generateToken(user.id, user.email);

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
        select: { id: true, email: true, role: true },
      });
    } catch (error) {
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserById(id: number) {
    try {
      return this.prisma.user.findUnique({
        where: { id: id },
        select: { email: true, id: true },
      });
    } catch (error) {
      throw new UnauthorizedException(HttpStatus.UNAUTHORIZED);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new HttpException(
          "Couldn't find user by email" + email,
          HttpStatus.BAD_REQUEST,
        );
      }

      console.log(user);

      return {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      throw new HttpException('Route error', HttpStatus.BAD_REQUEST);
    }
  }

  async setAdmin(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (user) {
        try {
          return this.prisma.user.update({
            where: {
              email: email,
            },
            data: {
              role: 'admin',
            },
          });
        } catch (error) {
          throw new HttpException(
            "Couldn't update user to ADMIN",
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    } catch (error) {
      throw new UnauthorizedException(HttpStatus.UNAUTHORIZED);
    }
  }
}
