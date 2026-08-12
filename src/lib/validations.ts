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

export const sectionTargetPages = [
  { value: "home", label: "صفحه اصلی" },
  { value: "about", label: "درباره ما" },
  { value: "philosophy", label: "فلسفه ما" },
  { value: "founder", label: "بنیان‌گذار" },
  { value: "contact", label: "تماس" },
  { value: "projects", label: "پروژه‌ها" },
  { value: "articles", label: "مقالات" },
  { value: "videos", label: "ویدیوها" },
  { value: "standalone", label: "صفحه مستقل (/اسلاگ)" },
] as const;

const targetPageValues = sectionTargetPages.map((p) => p.value) as [
  string,
  ...string[],
];

export const sectionSchema = z.object({
  title: z.string().trim().min(1, "عنوان الزامی است"),
  slug: slugField,
  content: z.string().trim().min(1, "متن بخش الزامی است"),
  coverImage: z.string().trim().optional(),
  targetPage: z.enum(targetPageValues),
  position: z.coerce.number().int().default(0),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1, "نام کاربری را وارد کنید"),
  password: z.string().min(1, "رمز عبور را وارد کنید"),
});
