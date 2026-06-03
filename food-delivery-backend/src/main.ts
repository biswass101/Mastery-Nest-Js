import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-execption.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  app.useGlobalFilters(
    new GlobalExceptionFilter(),
  )

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor()
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
