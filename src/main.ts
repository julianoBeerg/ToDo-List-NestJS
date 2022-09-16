import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('To-Do List')
    .setDescription('Projeto To-Do List')
    .setContact(
      'Juliano Nunes',
      'https://github.com/julianoBeerg',
      'silva.juliano8130@gmail.com'
    )
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/swagger', app, document)

  process.env.TZ = '-03:00'//tz = time zone e esta colocando três horas a menos, ficando igual ao horario de brasilia

  app.useGlobalPipes(new ValidationPipe())//Habilitou as validações em todas as aplicações

  app.enableCors()// Permite que outros dominios consumam a API

  await app.listen(process.env.PORT ||3000);
}
bootstrap();
