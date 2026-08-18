"use server";

import { redirect } from "next/navigation";
import {
  registerForumUser,
  verifyForumCredentials,
  createForumSession,
  destroyForumSession,
} from "@/lib/forum-auth";
import { forumRegisterSchema, forumLoginSchema } from "@/lib/validations";

export type ForumAuthState = { error?: string };

export async function registerForum(
  _prevState: ForumAuthState,
  formData: FormData,
): Promise<ForumAuthState> {
  const parsed = forumRegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "اطلاعات نامعتبر است" };
  }

  const result = await registerForumUser(
    parsed.data.name,
    parsed.data.email,
    parsed.data.password,
  );
  if ("error" in result) {
    return { error: result.error };
  }

  await createForumSession(result.userId, parsed.data.name);
  redirect("/forum");
}

export async function loginForum(
  _prevState: ForumAuthState,
  formData: FormData,
): Promise<ForumAuthState> {
  const parsed = forumLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "اطلاعات نامعتبر است" };
  }

  const session = await verifyForumCredentials(
    parsed.data.email,
    parsed.data.password,
  );
  if (!session) {
    return { error: "ایمیل یا رمز عبور اشتباه است" };
  }

  await createForumSession(session.userId, session.name);
  redirect("/forum");
}

export async function logoutForum(): Promise<void> {
  await destroyForumSession();
  redirect("/forum");
}
