import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import { HeaderAuthGuard } from '../security/auth.guard';
import { ZodValidationPipe } from '@lazidog/utils';

const echoSchema = z.object({
  message: z.string().min(1).max(2000),
});

@Controller('/v1')
@UseGuards(HeaderAuthGuard)
export class EchoController {
  @Post('/echo')
  echo(@Body(new ZodValidationPipe(echoSchema)) body: z.infer<typeof echoSchema>) {
    return { echoed: body.message };
  }
}

