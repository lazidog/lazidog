import { optimizeImage } from "wasm-image-optimization";
export interface Env {
  BUCKET: R2Bucket;
  AUTH_KEY_SECRET: string;
}

type ImageFormat = "image/jpeg" | "image/png" | "image/webp" | "image/avif";
type ResizeImageFormat = "jpeg" | "png" | "webp" | "avif";

const RESIZE_QUALITY = 70;

const hasValidHeader = (request: Request, env: Env) => {
  switch (request.method) {
    case "PUT":
    case "POST":
    case "DELETE":
      return request.headers.get("X-Custom-Auth-Key") === env.AUTH_KEY_SECRET;
    default:
      return true;
  }
};

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: EventContext<Env, string, unknown>,
  ) {
    const responseHeaders = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": "true",
    });

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: responseHeaders,
      });
    }
    if (!hasValidHeader(request, env)) {
      return new Response("Unauthorized", { status: 401 });
    }

    const url = new URL(request.url);
    const key = url.pathname.toString().slice(1);
    const width = (() => {
      const width = url.searchParams.get("width");
      if (width) {
        const widthInt = Number.parseInt(width);
        if (Number.isNaN(widthInt)) {
          return undefined;
        }
        return widthInt;
      }
      return undefined;
    })();
    const format = (() => {
      const format = url.searchParams.get("format");
      const validFormats = ["jpeg", "png", "webp", "avif"];
      if (format && validFormats.includes(format)) {
        return `image/${format}` as ImageFormat;
      }
      return "image/webp";
    })();

    switch (request.method) {
      case "PUT": {
        const image = await request.arrayBuffer();
        const contentType = request.headers.get("content-type") || "";
        await env.BUCKET.put(key, image, {
          httpMetadata: { contentType: contentType },
        });
        return new Response(`Put ${key} successfully!`, {
          headers: responseHeaders,
        });
      }
      case "GET": {
        const cache = caches.default;
        const cacheKey = request.url;
        const cachedResponse = await cache.match(cacheKey);
        if (cachedResponse) {
          return cachedResponse;
        }

        const object = await env.BUCKET.get(key);

        if (object === null) {
          return new Response("Object Not Found", { status: 404 });
        }

        responseHeaders.set("etag", object.httpEtag);
        const originalContentType = object.httpMetadata?.contentType;
        object.writeHttpMetadata(responseHeaders);

        // widthパラメータが指定されている場合画像をリサイズ
        const responseBody = await (async () => {
          if (width) {
            const originalBuffer = await object.arrayBuffer();
            try {
              const optimizedImage = await resizeImage({
                buffer: originalBuffer,
                width,
                quality: RESIZE_QUALITY,
                format,
              });
              responseHeaders.set("content-type", format);
              return optimizedImage;
            } catch (error) {
              console.error("Image resize failed", error);
              if (originalContentType) {
                responseHeaders.set("content-type", originalContentType);
              }
              return originalBuffer;
            }
          } else {
            if (originalContentType) {
              responseHeaders.set("content-type", originalContentType);
            }
            return object.body;
          }
        })();

        const response = new Response(responseBody, {
          headers: responseHeaders,
        });

        // User-scoped images (avatar/cover) are overwritten in place; use revalidation so cache picks up updates
        const isUserScoped = key.startsWith("users/");
        const cacheControl = isUserScoped
          ? "public, max-age=3600, must-revalidate"
          : "s-maxage=31449600";
        response.headers.append("Cache-Control", cacheControl);
        ctx.waitUntil(cache.put(cacheKey, response.clone()));

        return response;
      }
      case "DELETE":
        await env.BUCKET.delete(key);
        return new Response("Deleted!", { headers: responseHeaders });

      default:
        return new Response("Method Not Allowed", {
          status: 405,
          headers: {
            Allow: "PUT, GET, DELETE",
          },
        });
    }
  },
};

/**
 * Resizes images
 * Uses the following libraries.
 * Converts to webp if possible. If not, outputs to JPEG if the original image is JPEG, otherwise outputs to PNG.
 * https://github.com/node-libraries/wasm-image-optimization
 */
const resizeImage = async ({
  buffer,
  width,
  quality,
  format,
}: {
  buffer: ArrayBuffer;
  width: number;
  quality: number;
  format: ImageFormat;
}): Promise<Uint8Array> => {
  try {
    const formatMap: Record<ImageFormat, ResizeImageFormat> = {
      "image/jpeg": "jpeg",
      "image/png": "png",
      "image/webp": "webp",
      "image/avif": "avif",
    };
    const formatValue = formatMap[format];

    const optimizedImage = await optimizeImage({
      image: buffer,
      width: width,
      quality: quality,
      format: formatValue,
    });

    if (!optimizedImage) {
      throw new Error("Image resize failed");
    }

    return optimizedImage;
  } catch (error) {
    console.error("Image resize failed", error);
    throw new Error("Image resize failed");
  }
};
