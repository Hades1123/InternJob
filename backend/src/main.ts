import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DEFAULT_PORT } from './shared/constants/constant';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? DEFAULT_PORT);
}
bootstrap();
