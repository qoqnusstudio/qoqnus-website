import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Deliberately separate from auth.ts's admin session: a different
// cookie name, a real User table instead of env-var credentials, and
// no notion of the site-admin role. Both happen to sign with
// SESSION_SECRET, which is fine — the cookie name and payload shape
// already keep the two sessions from ever being confused.
const SESSION_COOKIE = "qoqnus_forum_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30; // 30 days

function getSessionSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export type ForumSession = { userId: string; name: string };

export async function registerForumUser(
  name: string,
  email: string,
  password: string,
): Promise<{ userId: string } | { error: string }> {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "این ایمیل قبلاً ثبت‌نام کرده است" };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
  });
  return { userId: user.id };
}

export async function verifyForumCredentials(
  email: string,
  password: string,
): Promise<{ userId: string; name: string } | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.banned) return null;

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;

  return { userId: user.id, name: user.name };
}

export async function createForumSession(
  userId: string,
  name: string,
): Promise<void> {
  const token = await new SignJWT({ userId, name })
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

export async function destroyForumSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getForumSession(): Promise<ForumSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    if (
      typeof payload.userId !== "string" ||
      typeof payload.name !== "string"
    ) {
      return null;
    }
    return { userId: payload.userId, name: payload.name };
  } catch {
    return null;
  }
}
