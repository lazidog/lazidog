'use client';

import {
  logoutResponseSchema,
  refreshSessionResponseSchema,
  sessionSchema,
} from '@lazidog/shared/client';
import { authHttp, readApiData } from './http';

export const authApi = {
  session: () => readApiData(authHttp.get('/v1/session'), sessionSchema),
  refresh: () => readApiData(authHttp.post('/v1/refresh'), refreshSessionResponseSchema),
  logout: () => readApiData(authHttp.post('/v1/logout'), logoutResponseSchema),
};
