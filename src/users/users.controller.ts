import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('getAuth')
  async getAuthorizationHeader(@Req() req: Request) {
    return this.usersService.getAuthorizationHeader(req);
  }

  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return this.usersService.register(
      userRegisterDto.email,
      userRegisterDto.password,
    );
  }

  @Post('login')
  async login(
    @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, status, userId } = await this.usersService.login(
      userLoginDto.email,
      userLoginDto.password,
    );

    response.cookie('Authorization', token, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 1000,
    });

    return { token, status, userId };
  }

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Put(':email')
  async setAdmin(@Param('email') email: string) {
    return this.usersService.setAdmin(email);
  }
}
