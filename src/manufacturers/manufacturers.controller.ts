import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import { Role } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('manufacturers')
export class ManufacturersController {
  constructor(private readonly manufacturersService: ManufacturersService) {}

  // @Role('admin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body('name') name: string) {
    return this.manufacturersService.create(name);
  }

  @Get()
  async findAll() {
    return this.manufacturersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.manufacturersService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.manufacturersService.remove(id);
  }
}
