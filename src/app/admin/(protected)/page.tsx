import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [articleCount, projectCount, videoCount, sectionCount] =
    await Promise.all([
      prisma.article.count(),
      prisma.project.count(),
      prisma.video.count(),
      prisma.section.count(),
    ]);

  const cards = [
    { label: "مقالات", count: articleCount, href: "/admin/articles" },
    { label: "پروژه‌ها", count: projectCount, href: "/admin/projects" },
    { label: "ویدیوها", count: videoCount, href: "/admin/videos" },
    { label: "بخش‌های سفارشی", count: sectionCount, href: "/admin/sections" },
  ];

  return (
    <div>
      <h1 className="text-3xl text-ivory">داشبورد</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-lg border border-gold-500/10 bg-black/30 p-6 transition-colors hover:border-gold-500/30"
          >
            <p className="text-3xl text-gold-500">{card.count}</p>
            <p className="mt-2 text-sm text-ivory/70">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
