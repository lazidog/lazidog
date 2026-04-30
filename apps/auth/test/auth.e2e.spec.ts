import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import { AuthModule } from '../src/modules/auth.module';

function pickCookies(setCookie: string[] | undefined) {
  return (setCookie ?? []).map((c) => c.split(';')[0]).join('; ');
}

const shouldRun = Boolean(process.env.DATABASE_URL);
const describeAuth = shouldRun ? describe : describe.skip;

describeAuth('auth flow (dev)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.NODE_ENV ??= 'test';
    process.env.JWT_ACCESS_SECRET ??= 'dev_access_secret_change_me_please';
    process.env.JWT_ACCESS_TTL_SECONDS ??= '900';
    process.env.WEB_BASE_URL ??= 'http://localhost:3000';
    process.env.AUTH_BASE_URL ??= 'http://localhost:4002';
    process.env.GATEWAY_BASE_URL ??= 'http://localhost:4001';
    process.env.API_BASE_URL ??= 'http://localhost:4000';
    process.env.GATEWAY_INTERNAL_SECRET ??= 'dev_gateway_secret_change_me';

    const mod = await Test.createTestingModule({ imports: [AuthModule] }).compile();
    app = mod.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('issues cookies and returns session', async () => {
    const login = await request(app.getHttpServer())
      .get('/v1/login/dev?returnTo=/')
      .redirects(0)
      .expect(302);

    const cookie = pickCookies(login.headers['set-cookie']);
    expect(cookie).toContain('ld_access=');
    expect(cookie).toContain('ld_refresh=');

    const session = await request(app.getHttpServer()).get('/v1/session').set('Cookie', cookie).expect(200);
    expect(session.body.success).toBe(true);
    expect(session.body.data.user.email).toBe('dev@lazidog.dev');
  });
});
