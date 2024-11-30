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

  async findById(id: number) {
    try {
      const manufacturer = await this.prisma.manufacturer.findUnique({
        where: {
          id: +id,
        },
      });
      return manufacturer;
    } catch (error) {
      console.error(error);
      throw new HttpException("Coudln't FIND manufacturer by id ", id);
    }
  }

  async remove(id: number) {
    try {
      const removedManufacturer = await this.prisma.manufacturer.delete({
        where: {
          id: +id,
        },
      });
      return removedManufacturer;
    } catch (error) {
      console.error(error);
      throw new HttpException("Couldn't REMOVE manufacturer by id ", id);
    }
  }
}
