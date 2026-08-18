"use client";

import { useActionState } from "react";
import { createTopic, type ForumFormState } from "@/lib/actions/forum";
import { forumCategories } from "@/lib/validations";

const initialState: ForumFormState = {};

export default function NewTopicForm() {
  const [state, formAction, pending] = useActionState(
    createTopic,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div>
        <label htmlFor="title" className="mb-2 block text-sm text-ivory/70">
          عنوان
        </label>
        <input id="title" name="title" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="category" className="mb-2 block text-sm text-ivory/70">
          دسته
        </label>
        <select id="category" name="category" className={inputClass}>
          {forumCategories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="content" className="mb-2 block text-sm text-ivory/70">
          متن
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={8}
          className={inputClass}
        />
      </div>

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
        {pending ? "در حال ثبت..." : "ثبت موضوع"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-gold-500/20 bg-black/30 px-4 py-3 text-sm text-ivory outline-none focus:border-gold-500/60";
