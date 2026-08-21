import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

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

export default function About() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="درباره ما" title="استودیو ققنوس" />

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <div className="glass h-full p-8 transition-colors hover:border-gold-500/35">
                <h3 className="text-xl text-gold-500">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ivory/60">
                  {card.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Link
            href="/about"
            className="text-sm text-gold-500 underline decoration-gold-500/30 underline-offset-4 transition-colors hover:decoration-gold-500"
          >
            بیشتر بدانید
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
