import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//entry point of any Nest Js Project
async function bootstrap() {
  const app = await NestFactory.create(AppModule); //creating an instance of a Nest Js Application
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000); //port number
  // console.log(app); //inside of app instance
}
bootstrap();
