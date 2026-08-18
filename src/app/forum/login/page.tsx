"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginForum, type ForumAuthState } from "@/lib/actions/forum-auth";

const initialState: ForumAuthState = {};

export default function ForumLoginPage() {
  const [state, formAction, pending] = useActionState(loginForum, initialState);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-sm flex-col justify-center px-6 py-16">
      <p className="text-center text-xs tracking-[0.3em] text-gold-500">
        انجمن ققنوس
      </p>
      <h1 className="mt-3 text-center text-3xl text-ivory">ورود</h1>

      <form action={formAction} className="mt-10 flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-ivory/70">
            ایمیل
          </label>
          <input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm text-ivory/70"
          >
            رمز عبور
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
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
          className="mt-2 rounded-md bg-gold-500 py-3 text-sm font-medium text-maroon-950 transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "در حال ورود..." : "ورود"}
        </button>

        <p className="text-center text-sm text-ivory/60">
          حساب ندارید؟{" "}
          <Link
            href="/forum/register"
            className="text-gold-500 underline decoration-gold-500/30 underline-offset-4 hover:decoration-gold-500"
          >
            ثبت‌نام
          </Link>
        </p>
      </form>
    </section>
  );
}

const inputClass =
  "w-full rounded-md border border-gold-500/20 bg-black/30 px-4 py-3 text-sm text-ivory outline-none focus:border-gold-500/60";
