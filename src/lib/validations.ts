import { z } from "zod";
import { isValidSlug } from "@/lib/slug";

const slugField = z
  .string()
  .trim()
  .min(1, "اسلاگ الزامی است")
  .refine(
    isValidSlug,
    "اسلاگ فقط می‌تواند شامل حروف انگلیسی کوچک، عدد و خط تیره باشد",
  );

export const articleSchema = z.object({
  title: z.string().trim().min(1, "عنوان الزامی است"),
  slug: slugField,
  excerpt: z.string().trim().optional(),
  content: z.string().trim().min(1, "متن مقاله الزامی است"),
  coverImage: z.string().trim().optional(),
  published: z.boolean(),
});

export const projectSchema = z.object({
  title: z.string().trim().min(1, "عنوان الزامی است"),
  slug: slugField,
  description: z.string().trim().min(1, "توضیح الزامی است"),
  tag: z.string().trim().optional(),
  coverImage: z.string().trim().optional(),
  coverVideo: z.string().trim().optional(),
  order: z.coerce.number().int().default(0),
  published: z.boolean(),
});

export const videoPlatforms = [
  { value: "YOUTUBE", label: "یوتیوب" },
  { value: "APARAT", label: "آپارات" },
] as const;

export const videoSchema = z.object({
  title: z.string().trim().min(1, "عنوان الزامی است"),
  description: z.string().trim().optional(),
  platform: z.enum(["YOUTUBE", "APARAT"]),
  url: z.string().trim().url("لینک معتبر وارد کنید"),
  order: z.coerce.number().int().default(0),
  published: z.boolean(),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1, "نام کاربری را وارد کنید"),
  password: z.string().min(1, "رمز عبور را وارد کنید"),
});
