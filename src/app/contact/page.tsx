import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import {
  PhoneIcon,
  TelegramIcon,
  ChatIcon,
  GlobeIcon,
  PlayIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "تماس با ما | استودیو ققنوس",
};

const contactMethods = [
  {
    icon: PhoneIcon,
    label: "تلفن",
    value: "09057215938",
    href: "tel:09057215938",
  },
  {
    icon: TelegramIcon,
    label: "تلگرام",
    value: "@Qoqnus_Studio",
    href: "https://t.me/Qoqnus_Studio",
  },
  {
    icon: ChatIcon,
    label: "ایتا",
    value: "@Qoqnus_Studio",
    href: "https://eitaa.com/Qoqnus_Studio",
  },
  {
    icon: GlobeIcon,
    label: "وب‌سایت",
    value: "qost.ir",
    href: "https://qost.ir",
  },
  {
    icon: PlayIcon,
    label: "آپارات",
    value: "Qoqnus_studio",
    href: "https://www.aparat.com/Qoqnus_studio",
  },
];

export default function ContactPage() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <p className="text-xs tracking-[0.3em] text-gold-500">ارتباط با ما</p>
          <h1 className="mt-4 text-4xl text-ivory sm:text-5xl">
            تماس با استودیو ققنوس
          </h1>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {contactMethods.map((method, i) => (
            <Reveal key={method.label} delay={i * 0.08}>
              <a
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  method.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="flex h-full flex-col items-center gap-3 rounded-lg border border-gold-500/10 bg-black/20 p-8 text-center transition-colors hover:border-gold-500/30"
              >
                <method.icon className="h-8 w-8 text-gold-500" />
                <h2 className="text-lg text-ivory">{method.label}</h2>
                <p dir="ltr" className="text-sm text-ivory/60">
                  {method.value}
                </p>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 text-center" delay={0.3}>
          <a
            href="https://t.me/Qoqnus_Studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md bg-gold-500 px-9 py-3.5 text-sm font-medium text-maroon-950 transition-opacity hover:opacity-90"
          >
            شروع همکاری
          </a>
        </Reveal>
      </div>
    </section>
  );
}
