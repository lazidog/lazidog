import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../routes/auth.controller';
import { AuthService } from '../services/auth.service';
import { GoogleStrategy } from '../strategies/google.strategy';
import { TokenService } from '../services/token.service';
import { GoogleAuthGuard } from '../guards/google-auth.guard';

@Module({
  imports: [PassportModule.register({ session: false })],
  controllers: [AuthController],
  providers: [AuthService, TokenService, GoogleStrategy, GoogleAuthGuard],
})
export class AuthModule {}
