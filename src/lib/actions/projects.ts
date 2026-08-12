"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations";

export type ProjectFormState = { error?: string };

function readProjectForm(formData: FormData) {
  return projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    tag: formData.get("tag") || undefined,
    coverImage: formData.get("coverImage") || undefined,
    coverVideo: formData.get("coverVideo") || undefined,
    order: formData.get("order") || 0,
    published: formData.get("published") === "on",
  });
}

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const parsed = readProjectForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "اطلاعات نامعتبر است" };
  }

  const existing = await prisma.project.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (existing) {
    return { error: "این اسلاگ قبلاً استفاده شده است" };
  }

  await prisma.project.create({ data: parsed.data });

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const parsed = readProjectForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "اطلاعات نامعتبر است" };
  }

  const existing = await prisma.project.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (existing && existing.id !== id) {
    return { error: "این اسلاگ قبلاً استفاده شده است" };
  }

  await prisma.project.update({ where: { id }, data: parsed.data });

  revalidatePath("/projects");
  revalidatePath(`/projects/${parsed.data.slug}`);
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string): Promise<void> {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}
