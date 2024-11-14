import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return this.usersService.register(
      userRegisterDto.email,
      userRegisterDto.password,
    );
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.usersService.login(userLoginDto.email, userLoginDto.password);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @Role('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }
}
