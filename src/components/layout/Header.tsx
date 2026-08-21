"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/nav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "glass-strong border-b border-gold-500/10"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-4 px-6 py-4 md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="flex items-center gap-3 leading-tight">
          <Image
            src="/images/logo-icon.png"
            alt=""
            width={584}
            height={598}
            className="h-9 w-auto shrink-0"
            priority
          />
          <span className="flex flex-col">
            <span className="font-serif text-xl tracking-[0.2em] text-gold-500">
              QOQNUS
            </span>
            <span className="text-[11px] tracking-[0.3em] text-ivory/60">
              MEDIA STUDIO
            </span>
          </span>
        </Link>

        <nav className="hidden gap-7 md:flex">
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

        <div className="hidden justify-self-start md:flex">
          <Link
            href="/contact"
            className="glass rounded-full px-6 py-2.5 text-sm text-gold-100 transition-colors hover:border-gold-500/50 hover:text-gold-500"
          >
            تماس با ما
          </Link>
        </div>

        <button
          type="button"
          aria-label="باز کردن منو"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 justify-self-start p-2 md:hidden"
        >
          <span className="h-0.5 w-6 bg-ivory" />
          <span className="h-0.5 w-6 bg-ivory" />
          <span className="h-0.5 w-6 bg-ivory" />
        </button>
      </div>

      {open && (
        <nav className="glass-strong flex flex-col gap-4 border-t border-gold-500/10 px-6 py-6 md:hidden">
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
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="w-fit rounded-full border border-gold-500/30 px-6 py-2.5 text-sm text-gold-100"
          >
            تماس با ما
          </Link>
        </nav>
      )}
    </header>
  );
}
