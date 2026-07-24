import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function PhilosophyTeaser() {
  return (
    <section className="bg-maroon-900/30 px-6 py-28">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading eyebrow="اندیشه رسانه" title="فلسفه ما" />
        <Reveal className="mt-10" delay={0.1}>
          <p className="text-base leading-8 text-ivory/70">
            ما به رسانه به‌عنوان ابزار نگاه نمی‌کنیم؛ ما رسانه را{" "}
            <span className="text-gold-500">شرطِ نگاه</span> می‌دانیم. ققنوس یک
            استودیوی رسانه‌ای مستقل است که بر این باور است که رسانه صرفاً وسیله
            انتقال پیام نیست، بلکه ساختاری است که ادراک، معنا و نسبت ما با حقیقت
            را صورت‌بندی می‌کند.
          </p>
          <Link
            href="/philosophy"
            className="mt-6 inline-block text-sm text-gold-500 underline decoration-gold-500/30 underline-offset-4 transition-colors hover:decoration-gold-500"
          >
            بیشتر بدانید
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
