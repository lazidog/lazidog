'use client';

import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiClientError, apiFailSchema, apiOkSchema } from '@lazidog/shared/client';
import type { ZodSchema } from 'zod';
import { appConfig } from '../config';

type RetriableRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<void> | null = null;

export const authHttp = axios.create({
  baseURL: appConfig.authBaseUrl,
  withCredentials: true,
});

export const apiHttp = axios.create({
  baseURL: appConfig.apiBaseUrl,
  withCredentials: true,
});

async function refreshSession() {
  refreshPromise ??= authHttp
    .post('/v1/refresh')
    .then(() => undefined)
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

function notifyAuthExpired() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('lazidog:auth-expired'));
  }
}

apiHttp.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const response = error.response;
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (response?.status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await refreshSession();
      return apiHttp.request(originalRequest);
    } catch (refreshError) {
      notifyAuthExpired();
      return Promise.reject(refreshError);
    }
  }
);

authHttp.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const response = error.response;
    const originalRequest = error.config as RetriableRequestConfig | undefined;
    const url = originalRequest?.url ?? '';
    const isRefreshRequest = url.includes('/v1/refresh');

    if (
      response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isRefreshRequest
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await refreshSession();
      return authHttp.request(originalRequest);
    } catch (refreshError) {
      notifyAuthExpired();
      return Promise.reject(refreshError);
    }
  }
);

export async function readApiData<T>(
  request: Promise<{ data: unknown }>,
  schema: ZodSchema<T>
): Promise<T> {
  try {
    const response = await request;
    const ok = apiOkSchema.safeParse(response.data);
    if (!ok.success) {
      const fail = apiFailSchema.safeParse(response.data);
      if (fail.success) {
        throw new ApiClientError(
          fail.data.error.message,
          fail.data.error.code,
          undefined,
          fail.data.error.details
        );
      }
      throw new ApiClientError('Invalid API response', 'INVALID_RESPONSE');
    }
    return schema.parse(ok.data.data);
  } catch (error) {
    if (error instanceof ApiClientError) throw error;

    if (axios.isAxiosError(error)) {
      const fail = apiFailSchema.safeParse(error.response?.data);
      if (fail.success) {
        throw new ApiClientError(
          fail.data.error.message,
          fail.data.error.code,
          error.response?.status,
          fail.data.error.details
        );
      }
      throw new ApiClientError(error.message, 'NETWORK_ERROR', error.response?.status);
    }

    throw error;
  }
}
