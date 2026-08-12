import "server-only";
import { getStore } from "@netlify/blobs";

const STORE_NAME = "uploads";

// In production (deployed on Netlify) getStore() auto-detects its
// context from environment variables Netlify injects at request time.
// Local dev has no such context unless run via `netlify dev`, so we
// fall back to explicit manual config when NETLIFY_SITE_ID and
// NETLIFY_AUTH_TOKEN are set in .env (optional, dev-only).
function getUploadsStore() {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_AUTH_TOKEN;
  if (siteID && token) {
    return getStore({ name: STORE_NAME, siteID, token });
  }
  return getStore(STORE_NAME);
}

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

export class UploadError extends Error {}

export async function saveUploadedImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new UploadError("فقط تصویر (JPG, PNG, WEBP, GIF, SVG) مجاز است");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new UploadError("حجم تصویر باید کمتر از ۸ مگابایت باشد");
  }

  const key = `${crypto.randomUUID()}-${sanitizeFilename(file.name)}`;
  const store = getUploadsStore();
  await store.set(key, await file.arrayBuffer(), {
    metadata: { contentType: file.type },
  });

  return `/api/uploads/${key}`;
}

export async function getUploadedImage(key: string) {
  const store = getUploadsStore();
  const result = await store.getWithMetadata(key, { type: "arrayBuffer" });
  if (!result) return null;
  return {
    data: result.data as ArrayBuffer,
    contentType:
      (result.metadata?.contentType as string | undefined) ??
      "application/octet-stream",
  };
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9.-]/g, "-").slice(-60);
}
