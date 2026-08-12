import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import CustomSection from "@/components/sections/CustomSection";
import { getPublishedSections } from "@/lib/sections";

export const metadata: Metadata = {
  title: "فلسفه ما | استودیو ققنوس",
};

const pillars = [
  {
    title: "هستی‌شناسی",
    description:
      "رسانه نحوه‌ای از تحقق واسطه‌مند وجود است، نه صرفاً ابزار انتقال پیام.",
  },
  {
    title: "معرفت‌شناسی",
    description:
      "رسانه صورت تاریخی-تکنیکی تحقق معرفت است که ادراک را شکل می‌دهد.",
  },
  {
    title: "روش‌شناسی",
    description: "تحقق رسانه باید در نسبت با حقیقت و غایت وجودی تنظیم شود.",
  },
];

export default async function PhilosophyPage() {
  const sections = await getPublishedSections("philosophy");
  const before = sections.filter((s) => s.position < 0);
  const after = sections.filter((s) => s.position >= 0);

  return (
    <>
      {before.map((s) => (
        <CustomSection key={s.id} section={s} />
      ))}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <p className="text-xs tracking-[0.3em] text-gold-500">
              اندیشه رسانه
            </p>
            <h1 className="mt-4 text-4xl text-ivory sm:text-5xl">فلسفه ما</h1>
          </Reveal>

          <Reveal className="mt-12 space-y-6 text-justify" delay={0.1}>
            <p className="text-base leading-8 text-ivory/70">
              ما به رسانه به‌عنوان ابزار نگاه نمی‌کنیم؛ ما رسانه را{""}
              <span className="text-gold-500">شرطِ نگاه</span> می‌دانیم. ققنوس
              یک استودیوی رسانه‌ای مستقل است که بر این باور است که رسانه صرفاً
              وسیله انتقال پیام نیست، بلکه ساختاری است که ادراک، معنا و نسبت ما
              با حقیقت را صورت‌بندی می‌کند.
            </p>
            <p className="text-base leading-8 text-ivory/70">
              ما در نقطه تلاقی{" "}
              <span className="text-gold-500">فلسفه اسلامی</span>،{" "}
              <span className="text-gold-500">فلسفه رسانه معاصر</span>، و{""}
              <span className="text-gold-500">فناوری‌های نوین تصویری</span>
              {""}
              ایستاده‌ایم. هدف ما تولید محتوا نیست؛ هدف ما بازاندیشی در خودِ
              امکان رسانه است.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.15 + i * 0.1}>
                <div className="h-full rounded-lg border-r-2 border-gold-500 bg-black/20 p-6">
                  <h2 className="text-lg text-ivory">{pillar.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-ivory/60">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {after.map((s) => (
        <CustomSection key={s.id} section={s} />
      ))}
    </>
  );
}
