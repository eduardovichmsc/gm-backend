import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://89.46.33.172:80', 'http://localhost:80'],
    credentials: true,
  });

  await app.listen(5000);
}
bootstrap();
