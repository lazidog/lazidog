import { Module } from "@nestjs/common";
import { GatewayController } from "./gateway.controller";
import { ProxyService } from "./proxy.service";
import { TokenService } from "./token.service";

@Module({
  controllers: [GatewayController],
  providers: [ProxyService, TokenService],
})
export class GatewayModule {}
