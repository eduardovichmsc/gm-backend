import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: process.env.ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  console.log(process.env.ORIGIN);

  await app.listen(5000);
}
bootstrap();
