import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingMiddlewareForMain as logger } from './common/middlewares/logger.middleware';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  // app.setGlobalPrefix('api');
  app.use(logger);
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000);
}

bootstrap();
