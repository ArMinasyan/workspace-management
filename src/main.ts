import * as dotenv from 'dotenv';
dotenv.config({
  path: `env/${process.env.NODE_ENV || 'prod'}.env`,
});

import { HttpExceptionFilter } from './common/exceptionFilters/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) => {
        throw new HttpException(
          {
            data: {},
            validationError: {
              property: errors[0].property,
              message: Object.values(errors[0].constraints)[0],
            },
            success: false,
            message: '',
            statusCode: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Workspace management')
    .setDescription('')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('wpm')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
