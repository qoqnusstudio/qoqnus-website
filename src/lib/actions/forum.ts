"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getForumSession } from "@/lib/forum-auth";
import { getSession } from "@/lib/auth";
import { containsBannedContent } from "@/lib/moderation";
import { forumTopicSchema, forumReplySchema } from "@/lib/validations";
import { slugify } from "@/lib/slug";

export type ForumFormState = { error?: string };

const MODERATION_ERROR =
  "این متن حاوی کلمات نامناسب است و منتشر نشد. لطفاً ویرایش کنید.";

function generateTopicSlug(title: string): string {
  const base = slugify(title);
  const suffix = crypto.randomUUID().split("-")[0];
  return base ? `${base}-${suffix}` : `topic-${suffix}`;
}

async function canModerate(authorId: string): Promise<boolean> {
  const forumSession = await getForumSession();
  if (forumSession?.userId === authorId) return true;
  const adminSession = await getSession();
  return !!adminSession;
}

export async function createTopic(
  _prevState: ForumFormState,
  formData: FormData,
): Promise<ForumFormState> {
  const session = await getForumSession();
  if (!session) {
    return { error: "برای ایجاد موضوع باید وارد شوید" };
  }

  const parsed = forumTopicSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    category: formData.get("category") || "general",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "اطلاعات نامعتبر است" };
  }

  if (
    containsBannedContent(parsed.data.title) ||
    containsBannedContent(parsed.data.content)
  ) {
    return { error: MODERATION_ERROR };
  }

  const slug = generateTopicSlug(parsed.data.title);
  await prisma.forumTopic.create({
    data: {
      title: parsed.data.title,
      content: parsed.data.content,
      category: parsed.data.category,
      slug,
      authorId: session.userId,
    },
  });

  revalidatePath("/forum");
  redirect(`/forum/${slug}`);
}

export async function createReply(
  topicId: string,
  _prevState: ForumFormState,
  formData: FormData,
): Promise<ForumFormState> {
  const session = await getForumSession();
  if (!session) {
    return { error: "برای پاسخ‌دادن باید وارد شوید" };
  }

  const topic = await prisma.forumTopic.findUnique({ where: { id: topicId } });
  if (!topic) {
    return { error: "موضوع پیدا نشد" };
  }
  if (topic.locked) {
    return { error: "این موضوع بسته شده و دیگر پاسخ نمی‌پذیرد" };
  }

  const parsed = forumReplySchema.safeParse({
    content: formData.get("content"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "اطلاعات نامعتبر است" };
  }

  if (containsBannedContent(parsed.data.content)) {
    return { error: MODERATION_ERROR };
  }

  await prisma.forumReply.create({
    data: {
      content: parsed.data.content,
      topicId,
      authorId: session.userId,
    },
  });

  revalidatePath(`/forum/${topic.slug}`);
  redirect(`/forum/${topic.slug}`);
}

export async function deleteTopic(id: string): Promise<void> {
  const topic = await prisma.forumTopic.findUnique({ where: { id } });
  if (!topic) return;
  if (!(await canModerate(topic.authorId))) return;

  await prisma.forumTopic.delete({ where: { id } });
  revalidatePath("/forum");
}

export async function deleteReply(id: string): Promise<void> {
  const reply = await prisma.forumReply.findUnique({
    where: { id },
    include: { topic: true },
  });
  if (!reply) return;
  if (!(await canModerate(reply.authorId))) return;

  await prisma.forumReply.delete({ where: { id } });
  revalidatePath(`/forum/${reply.topic.slug}`);
}

export async function togglePinTopic(id: string): Promise<void> {
  const adminSession = await getSession();
  if (!adminSession) return;

  const topic = await prisma.forumTopic.findUnique({ where: { id } });
  if (!topic) return;

  await prisma.forumTopic.update({
    where: { id },
    data: { pinned: !topic.pinned },
  });
  revalidatePath("/forum");
}

export async function toggleLockTopic(id: string): Promise<void> {
  const adminSession = await getSession();
  if (!adminSession) return;

  const topic = await prisma.forumTopic.findUnique({ where: { id } });
  if (!topic) return;

  await prisma.forumTopic.update({
    where: { id },
    data: { locked: !topic.locked },
  });
  revalidatePath(`/forum/${topic.slug}`);
}
