export type NavLink = {
  href: string;
  label: string;
};

// Single source of truth for site navigation, used by both the header
// and the footer so links never go stale or point to "#".
export const navLinks: NavLink[] = [
  { href: "/", label: "خانه" },
  { href: "/about", label: "درباره ما" },
  { href: "/projects", label: "پروژه‌ها" },
  { href: "/philosophy", label: "فلسفه ما" },
  { href: "/articles", label: "مقالات" },
  { href: "/videos", label: "ویدیوها" },
  { href: "/contact", label: "تماس" },
];

// Founder isn't in the primary nav — it's reached from a link inside
// the About page instead (per product decision).
export const founderLink: NavLink = { href: "/founder", label: "بنیان‌گذار" };
