import assert from 'node:assert/strict';
import test from 'node:test';
import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../dist/index.js';

test('ZodValidationPipe returns parsed values', () => {
  const pipe = new ZodValidationPipe(z.object({ page: z.coerce.number().int().positive() }));

  assert.deepEqual(pipe.transform({ page: '2' }), { page: 2 });
});

test('ZodValidationPipe throws BadRequestException for invalid input', () => {
  const pipe = new ZodValidationPipe(z.object({ email: z.string().email() }));

  assert.throws(() => pipe.transform({ email: 'nope' }), BadRequestException);
});
