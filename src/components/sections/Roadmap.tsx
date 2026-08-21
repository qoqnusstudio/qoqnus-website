import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GeometricWeave from "@/components/ui/GeometricWeave";

// The "civilization path" — real QOQNUS history/mission/vision (the
// same facts already told in About.tsx) restated as a directional
// timeline. No invented dates or milestones; "پاییز ۱۴۰۴" is the real
// founding season already used elsewhere on the site.
const steps = [
  {
    label: "خاستگاه",
    description:
      "بیش از پنج سال پیش، بنیان‌های نظری و مطالعات تمدنی و رسانه‌ای این مجموعه شکل گرفت.",
  },
  {
    label: "آغاز رسمی",
    description:
      "گروه رسانه‌ای استودیو ققنوس در پاییز ۱۴۰۴ فعالیت رسمی خود را آغاز کرد.",
  },
  {
    label: "مسیر امروز",
    description:
      "پیوند اندیشه، روایت و تصویر؛ تولید محتوای سینمایی با رویکردی نوین و حرفه‌ای.",
  },
  {
    label: "افق پیش‌رو",
    description:
      "بستری جهانی برای آثار تصویری که نسبتی تازه میان رسانه و حقیقت برقرار می‌کند.",
  },
];

export default function Roadmap() {
  return (
    <section className="relative overflow-hidden bg-paper px-6 py-28 text-[#0d151d]">
      <GeometricWeave className="text-maroon-700" opacity={0.05} />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow="مسیر تمدنی" title="از خاستگاه تا افق" />

        <div className="relative mt-20">
          <div className="absolute right-0 left-0 top-6 hidden h-px bg-maroon-700/15 lg:block" />

          <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <Reveal key={step.label} delay={i * 0.1}>
                <div className="relative flex flex-col items-start lg:items-center lg:text-center">
                  <div className="glass relative z-10 flex h-12 w-12 items-center justify-center rounded-full !border-maroon-700/25 !bg-paper text-sm text-maroon-700">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-5 text-lg text-[#0d151d]">
                    {step.label}
                  </h3>
                  <p className="mt-2 max-w-[22ch] text-sm leading-7 text-[#0d151d]/60">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
