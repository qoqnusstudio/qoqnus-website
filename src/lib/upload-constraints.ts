// Shared between the client-side upload widget (pre-upload check) and
// the server-side upload action (authoritative check) — no server-only
// guard here so both sides can import the same numbers.
export const MAX_UPLOAD_MB = 10;
export const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
] as const;
