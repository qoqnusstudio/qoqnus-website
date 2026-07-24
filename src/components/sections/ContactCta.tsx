import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function ContactCta() {
  return (
    <section className="bg-maroon-900/30 px-6 py-28 text-center">
      <Reveal className="mx-auto max-w-2xl">
        <p className="text-xs tracking-[0.3em] text-gold-500">شروع همکاری</p>
        <h2 className="mt-4 text-3xl text-ivory sm:text-4xl">
          گفت‌وگو را با ما آغاز کنید
        </h2>
        <p className="mt-5 text-sm leading-7 text-ivory/60">
          برای همکاری، پوشش رسانه‌ای یا مشاوره تولید محتوا با استودیو ققنوس در
          ارتباط باشید.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-md bg-gold-500 px-9 py-3.5 text-sm font-medium text-maroon-950 transition-opacity hover:opacity-90"
        >
          تماس با استودیو
        </Link>
      </Reveal>
    </section>
  );
}
