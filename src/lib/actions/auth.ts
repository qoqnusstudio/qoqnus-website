"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession, verifyCredentials } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";

export type LoginState = { error?: string };

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "نام کاربری و رمز عبور را کامل وارد کنید" };
  }

  const ok = await verifyCredentials(
    parsed.data.username,
    parsed.data.password,
  );
  if (!ok) {
    return { error: "نام کاربری یا رمز عبور اشتباه است" };
  }

  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
