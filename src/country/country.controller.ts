import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { UpdateCountryDto } from './dto/update-country.dto';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  // @Role('admin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body('name') name: any) {
    return this.countryService.create(name);
  }

  @Get()
  async findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  async findName(@Param('id') id: number) {
    return this.countryService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateCountryDto) {
    return this.countryService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.countryService.remove(id);
  }
}
