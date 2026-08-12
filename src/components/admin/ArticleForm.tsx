"use client";

import { useActionState } from "react";
import type { ArticleFormState } from "@/lib/actions/articles";
import ImageUploadField from "@/components/admin/ImageUploadField";

type ArticleFormProps = {
  action: (
    state: ArticleFormState,
    formData: FormData,
  ) => Promise<ArticleFormState>;
  defaultValues?: {
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    published: boolean;
  };
  submitLabel: string;
};

const initialState: ArticleFormState = {};

export default function ArticleForm({
  action,
  defaultValues,
  submitLabel,
}: ArticleFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <Field label="عنوان" htmlFor="title">
        <input
          id="title"
          name="title"
          defaultValue={defaultValues?.title}
          required
          className={inputClass}
        />
      </Field>

      <Field label="اسلاگ (فقط حروف انگلیسی، عدد و خط تیره)" htmlFor="slug">
        <input
          id="slug"
          name="slug"
          dir="ltr"
          defaultValue={defaultValues?.slug}
          required
          className={inputClass}
        />
      </Field>

      <Field label="خلاصه" htmlFor="excerpt">
        <textarea
          id="excerpt"
          name="excerpt"
          defaultValue={defaultValues?.excerpt ?? ""}
          rows={2}
          className={inputClass}
        />
      </Field>

      <Field label="متن مقاله (Markdown)" htmlFor="content">
        <textarea
          id="content"
          name="content"
          defaultValue={defaultValues?.content}
          required
          rows={12}
          className={inputClass}
        />
      </Field>

      <ImageUploadField
        name="coverImage"
        label="تصویر کاور"
        defaultValue={defaultValues?.coverImage}
      />

      <label className="flex items-center gap-2 text-sm text-ivory/80">
        <input
          type="checkbox"
          name="published"
          defaultChecked={defaultValues?.published}
        />
        منتشر شود
      </label>

      {state.error && (
        <p className="text-sm text-red-400" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-md bg-gold-500 px-6 py-3 text-sm font-medium text-maroon-950 hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "در حال ذخیره..." : submitLabel}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-gold-500/20 bg-black/30 px-4 py-3 text-sm text-ivory outline-none focus:border-gold-500/60";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm text-ivory/70">
        {label}
      </label>
      {children}
    </div>
  );
}
