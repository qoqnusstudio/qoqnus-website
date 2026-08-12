import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import {
  CameraIcon,
  BroadcastIcon,
  BookIcon,
  StudioIcon,
} from "@/components/icons";

const services = [
  {
    icon: CameraIcon,
    title: "تولید محتوای سینمایی",
    description:
      "ساخت برنامه‌های تصویری، مستند، فیلم کوتاه و محتوای رسانه‌ای با کیفیت حرفه‌ای و استانداردهای جهانی.",
  },
  {
    icon: BroadcastIcon,
    title: "پوشش رسانه‌ای",
    description:
      "پوشش حرفه‌ای رویدادها، نشست‌ها، همایش‌ها و برنامه‌های فرهنگی با تجهیزات استودیویی کامل.",
  },
  {
    icon: BookIcon,
    title: "پژوهش رسانه",
    description:
      "مطالعه و توسعه مبانی فلسفی و نظری رسانه با رویکرد حکمت اسلامی و فلسفه رسانه معاصر.",
  },
  {
    icon: StudioIcon,
    title: "طراحی استودیو",
    description:
      "مشاوره و راه‌اندازی استودیوهای تولید محتوا با تجهیزات حرفه‌ای صدا و تصویر.",
  },
];

export default function Services() {
  return (
    <section className="bg-maroon-900/30 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="خدمات ما" title="حوزه فعالیت" />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1}>
              <div className="h-full rounded-lg border border-gold-500/10 bg-black/20 p-8 text-center transition-colors hover:border-gold-500/30">
                <service.icon className="mx-auto h-9 w-9 text-gold-500" />
                <h3 className="mt-6 text-lg text-ivory">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ivory/60">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
