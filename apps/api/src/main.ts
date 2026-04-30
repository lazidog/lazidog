import 'dotenv-flow/config';
import 'reflect-metadata';

import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { getRuntimeEnv } from '@lazidog/config';
import {
  ApiExceptionFilter,
  ApiResponseInterceptor,
  createPinoHttp,
  requestIdMiddleware,
} from '@lazidog/utils';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const env = getRuntimeEnv();

  const app = await NestFactory.create(AppModule, { cors: false });
  app.use(requestIdMiddleware);
  app.use(createPinoHttp());
  app.use(cookieParser());
  app.use(helmet());

  app.enableCors({
    origin: [env.WEB_BASE_URL, env.GATEWAY_BASE_URL],
    credentials: true,
  });

  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalFilters(new ApiExceptionFilter());

  await app.listen(4000);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
