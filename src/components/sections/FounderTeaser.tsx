import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import FounderPortrait from "@/components/ui/FounderPortrait";

export default function FounderTeaser() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="بنیان‌گذار" title="حیدر صادقیان" />

        <Reveal className="glass mt-14 flex flex-col items-center gap-8 px-8 py-12 sm:flex-row sm:items-center sm:justify-center">
          <FounderPortrait size={140} />
          <div className="max-w-md text-center sm:text-right">
            <p className="text-sm leading-7 text-ivory/60">
              مدیر استودیو ققنوس و پژوهشگر فلسفه رسانه؛ مسیر فکری او در پیوند
              میان سنت فلسفه اسلامی، مطالعات تمدنی و رسانه شکل گرفته است.
            </p>
            <Link
              href="/founder"
              className="mt-5 inline-block text-sm text-gold-500 underline decoration-gold-500/30 underline-offset-4 transition-colors hover:decoration-gold-500"
            >
              معرفی کامل
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
