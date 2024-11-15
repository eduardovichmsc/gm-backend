import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ManufacturersService {
  constructor(private prisma: PrismaService) {}

  async create(name: string) {
    try {
      const newManufacturer = await this.prisma.manufacturer.create({
        data: { name },
      });
      return newManufacturer;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Manufacturer creation failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const manufacturers = await this.prisma.manufacturer.findMany();
      return manufacturers;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        "Couldn't FIND_ANY manufacturers",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
