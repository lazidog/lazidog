import 'reflect-metadata';

import { getRuntimeEnv } from '@lazidog/config';
import {
  ApiExceptionFilter,
  ApiResponseInterceptor,
  createPinoHttp,
  requestIdMiddleware,
} from '@lazidog/utils';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './modules/app.module';

async function bootstrap() {
  const env = getRuntimeEnv();

  const app = await NestFactory.create(AppModule, { cors: false });
  app.use(requestIdMiddleware);
  app.use(createPinoHttp());
  app.use(cookieParser());
  app.use(helmet());

  app.enableCors({
    origin: [env.WEB_BASE_URL],
    credentials: true,
  });

  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalFilters(new ApiExceptionFilter());

  await app.listen(4001);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
