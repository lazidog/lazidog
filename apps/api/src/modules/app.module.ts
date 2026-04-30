import { getRuntimeEnv } from '@lazidog/config';
import { Module } from '@nestjs/common';
import type { MiddlewareConsumer, NestModule } from '@nestjs/common';

import { AdminController } from '../routes/admin.controller';
import { EchoController } from '../routes/echo.controller';
import { HealthController } from '../routes/health.controller';
import { UsersController } from '../routes/users.controller';
import { GatewayTrustMiddleware } from '../security/gateway-trust.middleware';

@Module({
  controllers: [HealthController, UsersController, AdminController, EchoController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const env = getRuntimeEnv();
    consumer.apply(GatewayTrustMiddleware(env.GATEWAY_INTERNAL_SECRET)).forRoutes('*');
  }
}
