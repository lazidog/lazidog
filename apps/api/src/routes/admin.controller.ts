import { Controller, Get, UseGuards } from '@nestjs/common';
import { HeaderAuthGuard } from '../security/auth.guard';
import { Roles } from '../security/roles.decorator';
import { RolesGuard } from '../security/roles.guard';

@Controller('/v1/admin')
@UseGuards(HeaderAuthGuard, RolesGuard)
export class AdminController {
  @Get('/ping')
  @Roles('admin')
  ping() {
    return { ok: true };
  }
}

