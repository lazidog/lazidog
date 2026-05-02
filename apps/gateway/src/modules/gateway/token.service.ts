import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { AppConfigService } from "../shared/services/app-config.service";

export type AccessTokenClaims = {
  sub: string;
  role: "user" | "admin";
  sid: string;
};

@Injectable()
export class TokenService {
  constructor(private readonly config: AppConfigService) {}

  verifyAccessToken(token: string): AccessTokenClaims {
    return jwt.verify(token, this.config.get("JWT_ACCESS_SECRET"), {
      audience: "lazidog",
      issuer: "auth",
    }) as AccessTokenClaims;
  }
}
