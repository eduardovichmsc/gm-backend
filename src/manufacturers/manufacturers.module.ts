import { Module } from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import { ManufacturersController } from './manufacturers.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ManufacturersController],
  providers: [ManufacturersService, PrismaService],
})
export class ManufacturersModule {}
