"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { articleSchema } from "@/lib/validations";

export type ArticleFormState = { error?: string };

function readArticleForm(formData: FormData) {
  return articleSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt") || undefined,
    content: formData.get("content"),
    coverImage: formData.get("coverImage") || undefined,
    published: formData.get("published") === "on",
  });
}

export async function createArticle(
  _prevState: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  const parsed = readArticleForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "اطلاعات نامعتبر است" };
  }

  const existing = await prisma.article.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (existing) {
    return { error: "این اسلاگ قبلاً استفاده شده است" };
  }

  await prisma.article.create({
    data: {
      ...parsed.data,
      publishedAt: parsed.data.published ? new Date() : null,
    },
  });

  revalidatePath("/articles");
  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function updateArticle(
  id: string,
  _prevState: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  const parsed = readArticleForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "اطلاعات نامعتبر است" };
  }

  const existing = await prisma.article.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (existing && existing.id !== id) {
    return { error: "این اسلاگ قبلاً استفاده شده است" };
  }

  const current = await prisma.article.findUnique({ where: { id } });
  if (!current) {
    return { error: "مقاله پیدا نشد" };
  }

  await prisma.article.update({
    where: { id },
    data: {
      ...parsed.data,
      publishedAt:
        parsed.data.published && !current.published
          ? new Date()
          : parsed.data.published
            ? current.publishedAt
            : null,
    },
  });

  revalidatePath("/articles");
  revalidatePath(`/articles/${parsed.data.slug}`);
  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function deleteArticle(id: string): Promise<void> {
  await prisma.article.delete({ where: { id } });
  revalidatePath("/articles");
  revalidatePath("/admin/articles");
}
