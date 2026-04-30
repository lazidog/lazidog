export interface Env {
  ALLOWED_ORIGINS: string;
  R2?: R2Bucket;
}

function isAllowed(url: URL, allowedOrigins: string[]) {
  return allowedOrigins.some((o) => {
    try {
      return url.origin === new URL(o).origin;
    } catch {
      return false;
    }
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const u = new URL(request.url);
    if (u.pathname !== '/img') {
      return new Response('Not found', { status: 404 });
    }

    const target = u.searchParams.get('url');
    if (!target) return new Response('Missing url', { status: 400 });

    let targetUrl: URL;
    try {
      targetUrl = new URL(target);
    } catch {
      return new Response('Invalid url', { status: 400 });
    }

    const allowed = env.ALLOWED_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean);
    if (allowed.length > 0 && !isAllowed(targetUrl, allowed)) {
      return new Response('Forbidden', { status: 403 });
    }

    const cacheKey = new Request(request.url, request);
    const cache = caches.default;
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    const upstream = await fetch(targetUrl.toString(), {
      headers: {
        // Avoid leaking any incoming headers to the origin.
        'user-agent': 'lazidog-proxy/1.0',
      },
    });

    if (!upstream.ok) {
      return new Response('Upstream error', { status: 502 });
    }

    // Basic caching strategy: cache successful responses for 1 hour.
    const res = new Response(upstream.body, upstream);
    res.headers.set('cache-control', 'public, max-age=3600');

    const r2Key = u.searchParams.get('r2Key');
    if (env.R2 && r2Key) {
      // Fire-and-forget; R2 is optional and should not block proxy responses.
      const contentType = res.headers.get('content-type') ?? undefined;
      ctx.waitUntil(
        (async () => {
          const buf = await res.clone().arrayBuffer();
          await env.R2!.put(r2Key, buf, {
            httpMetadata: contentType ? { contentType } : undefined,
          });
        })(),
      );
    }

    ctx.waitUntil(cache.put(cacheKey, res.clone()));
    return res;
  },
};
