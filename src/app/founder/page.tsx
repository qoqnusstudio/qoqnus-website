import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import FounderPortrait from "@/components/ui/FounderPortrait";

const STUDY_PHOTO_PATH = "/images/founder-study.jpg";

function hasStudyPhoto(): boolean {
  return fs.existsSync(
    path.join(process.cwd(), "public", STUDY_PHOTO_PATH),
  );
}

export const metadata: Metadata = {
  title: "بنیان‌گذار | استودیو ققنوس",
};

const skills = [
  "فلسفه رسانه",
  "حکمت اسلامی",
  "هوش مصنوعی",
  "تولید محتوا",
  "مدیریت استودیو",
  "زبان انگلیسی",
  "زبان عربی",
];

export default function FounderPage() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <p className="text-xs tracking-[0.3em] text-gold-500">بنیان‌گذار</p>
          <h1 className="mt-4 text-4xl text-ivory sm:text-5xl">حیدر صادقیان</h1>
        </Reveal>

        <Reveal
          className="mt-14 flex flex-col items-center gap-10 sm:flex-row sm:items-start"
          delay={0.1}
        >
          <FounderPortrait size={180} />
          <div className="text-center sm:text-right">
            <p className="text-sm tracking-widest text-gold-500">
              مدیر استودیو ققنوس | پژوهشگر فلسفه رسانه
            </p>
            <p className="mt-5 text-sm leading-8 text-ivory/70">
              طلبه پایه هفت حوزه علمیه و دانش‌پژوه مرکز تمدن اسلامی. مسیر فکری
              ایشان در پیوند میان سنت فلسفه اسلامی، مطالعات تمدنی و رسانه شکل
              گرفته است.
            </p>
            <p className="mt-4 text-sm leading-8 text-ivory/70">
              در کنار تحصیلات حوزوی، مطالعات گسترده‌ای در حوزه فلسفه رسانه،
              نظریه‌های ارتباطات و فناوری‌های نوین انجام داده و دوره‌های تخصصی
              هوش مصنوعی و رسانه دیجیتال را گذرانده است.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-1.5 text-xs text-gold-500"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {hasStudyPhoto() && (
          <Reveal className="mt-16 flex justify-center" delay={0.15}>
            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-gold-500/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={STUDY_PHOTO_PATH}
                alt="حیدر صادقیان در حال مطالعه"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_22px_rgba(61,12,10,0.85)]" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
