"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroParticles from "@/components/sections/HeroParticles";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden px-6">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, var(--color-maroon-700) 0%, var(--color-maroon-950) 75%)",
        }}
      />
      <HeroParticles />

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="text-sm tracking-[0.35em] text-gold-500">
          QOQNUS MEDIA STUDIO
        </p>
        <h1 className="mt-6 text-6xl tracking-[0.15em] text-ivory sm:text-8xl">
          ققنوس
        </h1>
        <p className="mt-4 text-lg text-gold-500">باززایی نگاه</p>
        <p className="mt-2 text-xs uppercase tracking-[0.35em] text-ivory/50">
          Cinema for Civilization
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/about"
            className="rounded-md bg-gold-500 px-9 py-3.5 text-sm font-medium text-maroon-950 transition-opacity hover:opacity-90"
          >
            کشف کنید
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-ivory/30 px-9 py-3.5 text-sm text-ivory transition-colors hover:border-gold-500/60 hover:text-gold-500"
          >
            تماس با ما
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { duration: 1, delay: 1 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="h-10 w-px bg-gradient-to-b from-gold-500 to-transparent" />
      </motion.div>
    </section>
  );
}
