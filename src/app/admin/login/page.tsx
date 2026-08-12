"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-sm flex-col justify-center px-6 py-16">
      <p className="text-center text-xs tracking-[0.3em] text-gold-500">
        پنل ادمین
      </p>
      <h1 className="mt-3 text-center text-3xl text-ivory">ورود مدیر</h1>

      <form action={formAction} className="mt-10 flex flex-col gap-4">
        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm text-ivory/70"
          >
            نام کاربری
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="w-full rounded-md border border-gold-500/20 bg-black/30 px-4 py-3 text-sm text-ivory outline-none focus:border-gold-500/60"
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
            className="w-full rounded-md border border-gold-500/20 bg-black/30 px-4 py-3 text-sm text-ivory outline-none focus:border-gold-500/60"
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
      </form>
    </section>
  );
}
