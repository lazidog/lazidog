import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { GatewayController } from '../routes/gateway.controller';
import { ProxyService } from '../services/proxy.service';
import { TokenService } from '../services/token.service';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 120,
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [
    ProxyService,
    TokenService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
