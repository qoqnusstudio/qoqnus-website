import Reveal from "@/components/ui/Reveal";
import { LinkIcon, EyeIcon, CameraIcon, CompassIcon } from "@/components/icons";

// Four operating principles, distilled from QOQNUS's own existing
// mission/philosophy/services copy (About, PhilosophyTeaser, Services) —
// not new claims, just an editorial restatement in a glass value-bar.
const values = [
  {
    icon: LinkIcon,
    title: "اصالت روایت",
    description: "پیوند اندیشه، روایت و تصویر در قالب رسانه‌ای امروزین.",
  },
  {
    icon: EyeIcon,
    title: "صداقت تصویر",
    description: "رسانه شرط نگاه است، نه صرفاً ابزار انتقال پیام.",
  },
  {
    icon: CameraIcon,
    title: "کیفیت سینمایی",
    description: "تولید حرفه‌ای با استانداردهای جهانیِ رسانه‌های تصویری.",
  },
  {
    icon: CompassIcon,
    title: "مسئولیت تمدنی",
    description: "روایتی برای افق تمدن اسلامی، نه صرفاً محتوایی گذرا.",
  },
];

export default function Values() {
  return (
    <section className="relative px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, i) => (
          <Reveal key={value.title} delay={i * 0.08}>
            <div className="glass flex h-full flex-col items-center gap-3 px-6 py-8 text-center">
              <value.icon className="h-7 w-7 text-gold-500" />
              <h3 className="text-base text-ivory">{value.title}</h3>
              <p className="text-xs leading-6 text-ivory/60">
                {value.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
