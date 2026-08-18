"use client";

import { useActionState } from "react";
import { createReply, type ForumFormState } from "@/lib/actions/forum";

const initialState: ForumFormState = {};

export default function ReplyForm({ topicId }: { topicId: string }) {
  const action = createReply.bind(null, topicId);
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="mt-4 flex flex-col gap-3">
      <textarea
        name="content"
        required
        rows={4}
        placeholder="پاسخ خود را بنویسید..."
        className="w-full rounded-md border border-gold-500/20 bg-black/30 px-4 py-3 text-sm text-ivory outline-none focus:border-gold-500/60"
      />
      {state.error && (
        <p className="text-sm text-red-400" role="alert">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-md bg-gold-500 px-5 py-2.5 text-sm font-medium text-maroon-950 hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "در حال ارسال..." : "ارسال پاسخ"}
      </button>
    </form>
  );
}
