import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const SESSION_COOKIE = "qoqnus_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const encodedHash = process.env.ADMIN_PASSWORD_HASH;
  if (!expectedUsername || !encodedHash) return false;
  if (username !== expectedUsername) return false;

  // The hash is stored base64-encoded because Next.js's .env loader
  // (dotenv-expand) treats a raw `$` in a value as variable-expansion
  // syntax and corrupts bcrypt hashes on load.
  const expectedHash = Buffer.from(encodedHash, "base64").toString("utf8");
  return bcrypt.compare(password, expectedHash);
}

export async function createSession(): Promise<void> {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSessionSecret());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<{ role: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    if (payload.role !== "admin") return null;
    return { role: "admin" };
  } catch {
    return null;
  }
}
