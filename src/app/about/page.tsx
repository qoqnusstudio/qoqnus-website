import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import CustomSection from "@/components/sections/CustomSection";
import { getPublishedSections } from "@/lib/sections";

export const metadata: Metadata = {
  title: "درباره ما | استودیو ققنوس",
};

const cards = [
  {
    title: "تاریخچه",
    description:
      "گروه رسانه‌ای استودیو ققنوس در پاییز ۱۴۰۴ فعالیت رسمی خود را آغاز کرد. ریشه‌های این مجموعه به بیش از پنج سال پیش بازمی‌گردد؛ زمانی که بنیان‌های نظری و مطالعات تمدنی و رسانه‌ای آن شکل گرفت.",
  },
  {
    title: "ماموریت",
    description:
      "پیوند میان اندیشه، روایت و تصویر؛ تلاشی برای شکل‌دادن به روایت‌های فرهنگی و تمدنی در قالب رسانه‌های تصویری با رویکردی نوین و حرفه‌ای.",
  },
  {
    title: "چشم‌انداز",
    description:
      "ایجاد بستری برای تولید آثار تصویری و سینمایی در سطح جهانی که بتوانند نسبت تازه‌ای میان رسانه و حقیقت برقرار کنند.",
  },
];

export default async function AboutPage() {
  const sections = await getPublishedSections("about");
  const before = sections.filter((s) => s.position < 0);
  const after = sections.filter((s) => s.position >= 0);

  return (
    <>
      {before.map((s) => (
        <CustomSection key={s.id} section={s} />
      ))}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <p className="text-xs tracking-[0.3em] text-gold-500">درباره ما</p>
            <h1 className="mt-4 text-4xl text-ivory sm:text-5xl">
              استودیو ققنوس
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-ivory/60">
              پلتفرمی برای پیوند اندیشه، رسانه و تصویر در افق تمدن اسلامی. ما
              باور داریم تمدن اسلامی بدون پیوست رسانه، عقیم است.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {cards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.1}>
                <div className="glass h-full p-8">
                  <h2 className="text-xl text-gold-500">{card.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-ivory/60">
                    {card.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 text-center" delay={0.2}>
            <p className="text-sm text-ivory/60">
              برای آشنایی با بنیان‌گذار استودیو ققنوس،{""}
              <Link
                href="/founder"
                className="text-gold-500 underline decoration-gold-500/30 underline-offset-4 hover:decoration-gold-500"
              >
                حیدر صادقیان
              </Link>
              {""}
              را بیشتر بشناسید.
            </p>
          </Reveal>
        </div>
      </section>
      {after.map((s) => (
        <CustomSection key={s.id} section={s} />
      ))}
    </>
  );
}
