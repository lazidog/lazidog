'use client';

import { meResponseSchema } from '@lazidog/shared/client';
import { apiHttp, readApiData } from './http';

export const usersApi = {
  me: () => readApiData(apiHttp.get('/v1/me'), meResponseSchema),
};
