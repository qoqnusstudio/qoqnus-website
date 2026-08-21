import Link from "next/link";
import { navLinks } from "@/lib/nav";

const contactLinks = [
  { label: "تلگرام", href: "https://t.me/Qoqnus_Studio" },
  { label: "ایتا", href: "https://eitaa.com/Qoqnus_Studio" },
  { label: "آپارات", href: "https://www.aparat.com/Qoqnus_studio" },
  { label: "تماس با ما", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="glass-strong border-t border-gold-500/10 px-6 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h2 className="text-lg text-gold-500">استودیو ققنوس</h2>
          <p className="mt-3 text-sm leading-8 text-ivory/70">
            پلتفرمی برای پیوند اندیشه، رسانه و تصویر در افق تمدن اسلامی.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm tracking-widest text-ivory/90">
            لینک‌های سریع
          </h3>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ivory/70 transition-colors hover:text-gold-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm tracking-widest text-ivory/90">
            ارتباط با ما
          </h3>
          <ul className="flex flex-col gap-2">
            {contactLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-sm text-ivory/70 transition-colors hover:text-gold-500"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-gold-500/10 pt-6 text-center text-xs text-ivory/50">
        © {new Date().getFullYear()} استودیو ققنوس — تمامی حقوق محفوظ است
      </div>
    </footer>
  );
}
