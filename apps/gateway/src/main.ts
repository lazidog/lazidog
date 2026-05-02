import "reflect-metadata";

import {
  ApiExceptionFilter,
  ApiResponseInterceptor,
  createPinoHttp,
  requestIdMiddleware,
} from "@lazidog/utils";
import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./modules/app.module";
import { AppConfigService } from "./modules/shared/services/app-config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);

  app.use(cookieParser());
  app.use(requestIdMiddleware);
  app.use(createPinoHttp());

  // Security headers — helmet with enhanced config
  app.use(
    helmet({
      // PT-010: Remove X-Powered-By header
      hidePoweredBy: true,
      // PT-011: X-Content-Type-Options (nosniff)
      noSniff: true,
      // PT-009: X-Frame-Options
      frameguard: { action: "deny" },
      // PT-008/PT-006: Strict Transport Security
      hsts: {
        maxAge: 63072000,
        includeSubDomains: true,
        preload: true,
      },
      // PT-012: Referrer-Policy
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
      // Content-Security-Policy for API (minimal — API doesn't serve HTML/scripts)
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'"],
          imgSrc: ["'self' data: blob: https:"],
          fontSrc: ["'self'"],
          connectSrc: ["'self'"],
          frameAncestors: ["'none'"],
          formAction: ["'self'"],
          objectSrc: ["'none'"],
        },
      },
    }),
  );

  app.enableCors({
    origin: configService.get("CORS_ORIGINS")?.split(",") || [],
    credentials: true,
  });

  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalFilters(new ApiExceptionFilter());

  const port = configService.getNumber("PORT");
  await app.listen(port);

  console.log(`gateway is running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
