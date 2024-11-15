import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from './products/products.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, JwtModule, ProductsModule, ManufacturersModule, CategoriesModule],
})
export class AppModule {}
