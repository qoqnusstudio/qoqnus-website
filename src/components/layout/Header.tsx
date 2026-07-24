"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/nav";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold-500/10 bg-maroon-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-serif text-xl tracking-[0.2em] text-gold-500">
            QOQNUS
          </span>
          <span className="text-[11px] tracking-[0.3em] text-ivory/60">
            MEDIA STUDIO
          </span>
        </Link>

        <nav className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ivory/90 transition-colors hover:text-gold-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="باز کردن منو"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span className="h-0.5 w-6 bg-ivory" />
          <span className="h-0.5 w-6 bg-ivory" />
          <span className="h-0.5 w-6 bg-ivory" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-gold-500/10 px-6 py-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-ivory/90 transition-colors hover:text-gold-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
