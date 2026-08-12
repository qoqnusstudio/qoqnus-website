"use client";

import { useRef, useState, useTransition } from "react";
import { uploadImage } from "@/lib/actions/uploads";
import {
  MAX_UPLOAD_BYTES,
  MAX_UPLOAD_MB,
  ALLOWED_IMAGE_TYPES,
} from "@/lib/upload-constraints";

type ImageUploadFieldProps = {
  name: string;
  label: string;
  defaultValue?: string | null;
};

export default function ImageUploadField({
  name,
  label,
  defaultValue,
}: ImageUploadFieldProps) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_UPLOAD_BYTES) {
      setError(`حجم تصویر باید کمتر از ${MAX_UPLOAD_MB} مگابایت باشد`);
      e.target.value = "";
      return;
    }

    setError(null);
    const formData = new FormData();
    formData.set("file", file);

    startTransition(async () => {
      const result = await uploadImage(formData);
      if (result.error) {
        setError(result.error);
      } else if (result.url) {
        setUrl(result.url);
      }
    });
  }

  return (
    <div>
      <label className="mb-2 block text-sm text-ivory/70">{label}</label>

      <input type="hidden" name={name} value={url} />

      <div className="flex flex-wrap items-center gap-4">
        {url && (
          <div className="h-20 w-32 shrink-0 overflow-hidden rounded-md border border-gold-500/20 bg-black/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-full w-full object-cover" />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={pending}
              className="rounded-md border border-gold-500/30 px-4 py-2 text-sm text-gold-500 transition-colors hover:bg-gold-500/10 disabled:opacity-60"
            >
              {pending
                ? "در حال آپلود..."
                : url
                  ? "تعویض تصویر"
                  : "آپلود تصویر"}
            </button>
            {url && (
              <button
                type="button"
                onClick={() => setUrl("")}
                className="text-sm text-red-400 hover:text-red-300"
              >
                حذف
              </button>
            )}
          </div>
          <input
            id={`${name}-manual`}
            dir="ltr"
            placeholder="یا آدرس URL تصویر را وارد کنید"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-72 rounded-md border border-gold-500/20 bg-black/30 px-3 py-2 text-xs text-ivory outline-none focus:border-gold-500/60"
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_IMAGE_TYPES.join(",")}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
