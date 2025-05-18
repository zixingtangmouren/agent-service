import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';
import { BaseExceptionFilter } from './common/exceptions/base-exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { generateDocument } from './doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.useGlobalFilters(new BaseExceptionFilter(), new HttpExceptionFilter());

  if (process.env.RUNNING_ENV === 'dev') {
    generateDocument(app);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
