"use client";

import { useActionState } from "react";
import type { VideoFormState } from "@/lib/actions/videos";
import { videoPlatforms } from "@/lib/validations";

type VideoFormProps = {
  action: (
    state: VideoFormState,
    formData: FormData,
  ) => Promise<VideoFormState>;
  defaultValues?: {
    title: string;
    description: string | null;
    platform: string;
    url: string;
    order: number;
    published: boolean;
  };
  submitLabel: string;
};

const initialState: VideoFormState = {};

export default function VideoForm({
  action,
  defaultValues,
  submitLabel,
}: VideoFormProps) {
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

      <Field label="توضیح (اختیاری)" htmlFor="description">
        <textarea
          id="description"
          name="description"
          defaultValue={defaultValues?.description ?? ""}
          rows={3}
          className={inputClass}
        />
      </Field>

      <Field label="پلتفرم" htmlFor="platform">
        <select
          id="platform"
          name="platform"
          dir="ltr"
          defaultValue={defaultValues?.platform ?? "YOUTUBE"}
          className={inputClass}
        >
          {videoPlatforms.map((platform) => (
            <option key={platform.value} value={platform.value}>
              {platform.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="لینک ویدیو (یوتیوب یا آپارات)" htmlFor="url">
        <input
          id="url"
          name="url"
          dir="ltr"
          defaultValue={defaultValues?.url}
          required
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
