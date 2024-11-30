import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  async create(name: string) {
    try {
      console.log(name);

      const newCountry = await this.prisma.country.create({
        data: { name },
      });
      return newCountry;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Country creation failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const countries = await this.prisma.country.findMany();
      return countries;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        "Couldn't FIND_ANY country",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findById(id: number) {
    try {
      const country = await this.prisma.country.findUnique({
        where: { id: +id },
      });
      if (!country) {
        throw new HttpException(
          "Couldn't FIND country",
          HttpStatus.BAD_REQUEST,
        );
      }
      return country;
    } catch (error) {
      console.error(error);
      throw new HttpException("Couldn't FIND country", HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updatedCountyDto: UpdateCountryDto) {
    try {
      const updatedCountry = await this.prisma.country.update({
        where: {
          id: +id,
        },
        data: {
          ...updatedCountyDto,
        },
      });
      return updatedCountry;
    } catch (error) {
      console.error(error);
      throw new HttpException('Updating failed', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const removedCountry = await this.prisma.country.delete({
        where: { id: +id },
      });
      return removedCountry;
    } catch (error) {
      console.error(error);
      throw new HttpException("Couldn't REMOVE country by id ", id);
    }
  }
}
