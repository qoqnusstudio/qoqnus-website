"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { videoSchema } from "@/lib/validations";

export type VideoFormState = { error?: string };

function readVideoForm(formData: FormData) {
  return videoSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    platform: formData.get("platform"),
    url: formData.get("url"),
    order: formData.get("order") || 0,
    published: formData.get("published") === "on",
  });
}

export async function createVideo(
  _prevState: VideoFormState,
  formData: FormData,
): Promise<VideoFormState> {
  const parsed = readVideoForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "اطلاعات نامعتبر است" };
  }

  await prisma.video.create({ data: parsed.data });

  revalidatePath("/videos");
  revalidatePath("/admin/videos");
  redirect("/admin/videos");
}

export async function updateVideo(
  id: string,
  _prevState: VideoFormState,
  formData: FormData,
): Promise<VideoFormState> {
  const parsed = readVideoForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "اطلاعات نامعتبر است" };
  }

  await prisma.video.update({ where: { id }, data: parsed.data });

  revalidatePath("/videos");
  revalidatePath("/admin/videos");
  redirect("/admin/videos");
}

export async function deleteVideo(id: string): Promise<void> {
  await prisma.video.delete({ where: { id } });
  revalidatePath("/videos");
  revalidatePath("/admin/videos");
}
