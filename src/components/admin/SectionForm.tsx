"use client";

import { useActionState } from "react";
import type { SectionFormState } from "@/lib/actions/sections";
import { sectionTargetPages } from "@/lib/validations";
import ImageUploadField from "@/components/admin/ImageUploadField";

type SectionFormProps = {
  action: (
    state: SectionFormState,
    formData: FormData,
  ) => Promise<SectionFormState>;
  defaultValues?: {
    title: string;
    slug: string;
    content: string;
    coverImage: string | null;
    embedUrl: string | null;
    targetPage: string;
    position: number;
    status: string;
  };
  submitLabel: string;
};

const initialState: SectionFormState = {};

export default function SectionForm({
  action,
  defaultValues,
  submitLabel,
}: SectionFormProps) {
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

      <Field label="متن بخش (Markdown)" htmlFor="content">
        <textarea
          id="content"
          name="content"
          defaultValue={defaultValues?.content}
          required
          rows={10}
          className={inputClass}
        />
      </Field>

      <ImageUploadField
        name="coverImage"
        label="تصویر کاور (اختیاری)"
        defaultValue={defaultValues?.coverImage}
      />

      <Field
        label="لینک پخش زنده / ویدیو (یوتیوب یا آپارات، اختیاری)"
        htmlFor="embedUrl"
      >
        <input
          id="embedUrl"
          name="embedUrl"
          dir="ltr"
          defaultValue={defaultValues?.embedUrl ?? ""}
          className={inputClass}
        />
      </Field>

      <Field label="صفحه هدف" htmlFor="targetPage">
        <select
          id="targetPage"
          name="targetPage"
          defaultValue={defaultValues?.targetPage ?? "home"}
          className={inputClass}
        >
          {sectionTargetPages.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="ترتیب (position)" htmlFor="position">
        <input
          id="position"
          name="position"
          type="number"
          dir="ltr"
          defaultValue={defaultValues?.position ?? 0}
          className={inputClass}
        />
      </Field>

      <Field label="وضعیت" htmlFor="status">
        <select
          id="status"
          name="status"
          defaultValue={defaultValues?.status ?? "draft"}
          className={inputClass}
        >
          <option value="draft">پیش‌نویس</option>
          <option value="published">منتشرشده</option>
        </select>
      </Field>

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
