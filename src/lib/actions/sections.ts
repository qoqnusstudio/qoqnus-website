"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sectionSchema } from "@/lib/validations";

export type SectionFormState = { error?: string };

const STATIC_PAGE_PATHS: Record<string, string> = {
  home: "/",
  about: "/about",
  philosophy: "/philosophy",
  founder: "/founder",
  contact: "/contact",
  projects: "/projects",
  articles: "/articles",
  videos: "/videos",
};

function revalidateTargetPage(targetPage: string, slug: string) {
  if (targetPage === "standalone") {
    revalidatePath(`/${slug}`);
    return;
  }
  const path = STATIC_PAGE_PATHS[targetPage];
  if (path) revalidatePath(path);
}

function readSectionForm(formData: FormData) {
  return sectionSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    coverImage: formData.get("coverImage") || undefined,
    embedUrl: formData.get("embedUrl") || undefined,
    targetPage: formData.get("targetPage"),
    position: formData.get("position") || 0,
    status: formData.get("status"),
  });
}

export async function createSection(
  _prevState: SectionFormState,
  formData: FormData,
): Promise<SectionFormState> {
  const parsed = readSectionForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "اطلاعات نامعتبر است" };
  }

  const existing = await prisma.section.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (existing) {
    return { error: "این اسلاگ قبلاً استفاده شده است" };
  }

  await prisma.section.create({ data: parsed.data });

  revalidateTargetPage(parsed.data.targetPage, parsed.data.slug);
  revalidatePath("/admin/sections");
  redirect("/admin/sections");
}

export async function updateSection(
  id: string,
  _prevState: SectionFormState,
  formData: FormData,
): Promise<SectionFormState> {
  const parsed = readSectionForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "اطلاعات نامعتبر است" };
  }

  const existing = await prisma.section.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (existing && existing.id !== id) {
    return { error: "این اسلاگ قبلاً استفاده شده است" };
  }

  const current = await prisma.section.findUnique({ where: { id } });
  if (!current) {
    return { error: "بخش پیدا نشد" };
  }

  await prisma.section.update({ where: { id }, data: parsed.data });

  revalidateTargetPage(current.targetPage, current.slug);
  revalidateTargetPage(parsed.data.targetPage, parsed.data.slug);
  revalidatePath("/admin/sections");
  redirect("/admin/sections");
}

export async function deleteSection(id: string): Promise<void> {
  const section = await prisma.section.delete({ where: { id } });
  revalidateTargetPage(section.targetPage, section.slug);
  revalidatePath("/admin/sections");
}

export async function toggleSectionStatus(id: string): Promise<void> {
  const section = await prisma.section.findUnique({ where: { id } });
  if (!section) return;

  await prisma.section.update({
    where: { id },
    data: { status: section.status === "published" ? "draft" : "published" },
  });

  revalidateTargetPage(section.targetPage, section.slug);
  revalidatePath("/admin/sections");
}

export async function moveSection(
  id: string,
  direction: "up" | "down",
): Promise<void> {
  const current = await prisma.section.findUnique({ where: { id } });
  if (!current) return;

  const neighbor = await prisma.section.findFirst({
    where: {
      targetPage: current.targetPage,
      position:
        direction === "up"
          ? { lt: current.position }
          : { gt: current.position },
    },
    orderBy:
      direction === "up"
        ? [{ position: "desc" }, { createdAt: "desc" }]
        : [{ position: "asc" }, { createdAt: "asc" }],
  });
  if (!neighbor) return;

  await prisma.$transaction([
    prisma.section.update({
      where: { id: current.id },
      data: { position: neighbor.position },
    }),
    prisma.section.update({
      where: { id: neighbor.id },
      data: { position: current.position },
    }),
  ]);

  revalidateTargetPage(current.targetPage, current.slug);
  revalidateTargetPage(neighbor.targetPage, neighbor.slug);
  revalidatePath("/admin/sections");
}
