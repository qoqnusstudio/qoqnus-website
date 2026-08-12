"use server";

import { getSession } from "@/lib/auth";
import { saveUploadedImage, UploadError } from "@/lib/blobs";

export type UploadImageState = { url?: string; error?: string };

export async function uploadImage(
  formData: FormData,
): Promise<UploadImageState> {
  const session = await getSession();
  if (!session) {
    return { error: "دسترسی غیرمجاز" };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "فایلی انتخاب نشده است" };
  }

  try {
    const url = await saveUploadedImage(file);
    return { url };
  } catch (err) {
    if (err instanceof UploadError) {
      return { error: err.message };
    }
    return { error: "آپلود تصویر ناموفق بود" };
  }
}
