import assert from 'node:assert/strict';
import test from 'node:test';
import {
  COOKIE_DOMAIN,
  getAuthCookieOptions,
  meResponseSchema,
  refreshSessionResponseSchema,
  sessionSchema,
} from '../dist/client.js';

test('auth cookies are locked to the production policy', () => {
  assert.deepEqual(getAuthCookieOptions(), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    domain: COOKIE_DOMAIN,
    path: '/',
  });
});

test('session contract parses shared auth responses', () => {
  const parsed = sessionSchema.parse({
    user: {
      id: 'c362bc1e-649c-409a-8f3b-a54c878bf0b2',
      email: 'user@lazidog.dev',
      name: 'Lazidog User',
      imageUrl: null,
      role: 'user',
      createdAt: '2026-05-10T00:00:00.000Z',
      updatedAt: '2026-05-10T00:00:00.000Z',
    },
  });

  assert.equal(parsed.user.email, 'user@lazidog.dev');
});

test('API user response rejects incomplete profiles', () => {
  const result = meResponseSchema.safeParse({
    id: 'c362bc1e-649c-409a-8f3b-a54c878bf0b2',
    role: 'user',
  });

  assert.equal(result.success, false);
});

test('refresh response contract is explicit', () => {
  assert.deepEqual(refreshSessionResponseSchema.parse({ refreshed: true }), {
    refreshed: true,
  });
});
