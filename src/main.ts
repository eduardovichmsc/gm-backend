import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: process.env.ORIGIN, credentials: true });
  app.use(cookieParser());

  console.log(process.env.DATABASE_URL);
  console.log(process.env.ORIGIN);

  await app.listen(5000);
}
bootstrap();
