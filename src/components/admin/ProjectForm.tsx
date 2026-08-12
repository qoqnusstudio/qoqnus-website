"use client";

import { useActionState } from "react";
import type { ProjectFormState } from "@/lib/actions/projects";
import ImageUploadField from "@/components/admin/ImageUploadField";

type ProjectFormProps = {
  action: (
    state: ProjectFormState,
    formData: FormData,
  ) => Promise<ProjectFormState>;
  defaultValues?: {
    title: string;
    slug: string;
    description: string;
    tag: string | null;
    coverImage: string | null;
    coverVideo: string | null;
    order: number;
    published: boolean;
  };
  submitLabel: string;
};

const initialState: ProjectFormState = {};

export default function ProjectForm({
  action,
  defaultValues,
  submitLabel,
}: ProjectFormProps) {
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

      <Field label="توضیح" htmlFor="description">
        <textarea
          id="description"
          name="description"
          defaultValue={defaultValues?.description}
          required
          rows={4}
          className={inputClass}
        />
      </Field>

      <Field label="برچسب (مثلاً: پوشش رسانه‌ای)" htmlFor="tag">
        <input
          id="tag"
          name="tag"
          defaultValue={defaultValues?.tag ?? ""}
          className={inputClass}
        />
      </Field>

      <ImageUploadField
        name="coverImage"
        label="تصویر کاور"
        defaultValue={defaultValues?.coverImage}
      />

      <Field label="ویدیوی کاور (آدرس URL، اختیاری)" htmlFor="coverVideo">
        <input
          id="coverVideo"
          name="coverVideo"
          dir="ltr"
          defaultValue={defaultValues?.coverVideo ?? ""}
          className={inputClass}
        />
      </Field>

      <Field label="ترتیب نمایش" htmlFor="order">
        <input
          id="order"
          name="order"
          type="number"
          dir="ltr"
          defaultValue={defaultValues?.order ?? 0}
          className={inputClass}
        />
      </Field>

      <label className="flex items-center gap-2 text-sm text-ivory/80">
        <input
          type="checkbox"
          name="published"
          defaultChecked={defaultValues?.published ?? true}
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
