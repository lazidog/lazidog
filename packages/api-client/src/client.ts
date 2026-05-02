import { apiFailSchema, apiOkSchema } from '@lazidog/shared';
import { sessionSchema } from '@lazidog/shared';
import { z } from 'zod';

type ClientOpts = {
  baseUrl: string;
  fetch?: typeof fetch;
};

type RequestOpts = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

async function requestJson<T>(opts: {
  fetchImpl: typeof fetch;
  baseUrl: string;
  path: string;
  responseSchema: z.ZodType<T>;
  request?: RequestOpts;
}): Promise<T> {
  const url = `${opts.baseUrl}${opts.path}`;
  const res = await opts.fetchImpl(url, {
    method: opts.request?.method ?? 'GET',
    headers: {
      'content-type': 'application/json',
      ...(opts.request?.headers ?? {}),
    },
    credentials: 'include',
    body: opts.request?.body ? JSON.stringify(opts.request.body) : undefined,
    signal: opts.request?.signal,
  });

  const text = await res.text();
  const json = text.length ? JSON.parse(text) : null;

  const okParsed = apiOkSchema.safeParse(json);
  const failParsed = apiFailSchema.safeParse(json);

  if (failParsed.success) {
    throw new Error(`${failParsed.data.error.code}: ${failParsed.data.error.message}`);
  }
  if (!okParsed.success) {
    throw new Error(`Unexpected response (${res.status})`);
  }

  const dataParsed = opts.responseSchema.safeParse(okParsed.data.data);
  if (!dataParsed.success) {
    throw new Error('Invalid response shape');
  }
  return dataParsed.data;
}

export function createApiClient({ baseUrl, fetch }: ClientOpts) {
  const fetchImpl = fetch ?? globalThis.fetch.bind(globalThis);
  if (!fetchImpl) {
    throw new Error('fetch is not available; pass a fetch implementation');
  }

  return {
    session: {
      get: () =>
        requestJson({
          fetchImpl,
          baseUrl,
          path: '/v1/session',
          responseSchema: sessionSchema,
        }),
      logout: () =>
        requestJson({
          fetchImpl,
          baseUrl,
          path: '/v1/logout',
          responseSchema: z.object({ ok: z.literal(true) }),
          request: { method: 'POST' },
        }),
    },
    health: {
      get: () =>
        requestJson({
          fetchImpl,
          baseUrl,
          path: '/v1/health',
          responseSchema: z.object({ ok: z.literal(true) }),
        }),
    },
    api: {
      me: () =>
        requestJson({
          fetchImpl,
          baseUrl,
          path: '/v1/api/me',
          responseSchema: z.object({
            id: z.string(),
            email: z.string().email().nullable(),
            role: z.enum(['user', 'admin']),
          }),
        }),
      adminPing: () =>
        requestJson({
          fetchImpl,
          baseUrl,
          path: '/v1/api/admin/ping',
          responseSchema: z.object({ ok: z.literal(true) }),
        }),
    },
  };
}
