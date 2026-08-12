import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PagePlaceholder from "@/components/ui/PagePlaceholder";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CustomSection from "@/components/sections/CustomSection";
import { getPublishedSections } from "@/lib/sections";

export const metadata: Metadata = {
  title: "مقالات | استودیو ققنوس",
};

export default async function ArticlesPage() {
  const [articles, sections] = await Promise.all([
    prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    }),
    getPublishedSections("articles"),
  ]);
  const before = sections.filter((s) => s.position < 0);
  const after = sections.filter((s) => s.position >= 0);

  if (articles.length === 0) {
    return (
      <>
        {before.map((s) => (
          <CustomSection key={s.id} section={s} />
        ))}
        <PagePlaceholder
          eyebrow="مقالات"
          title="مقالات ققنوس"
          description="مقالات منتشرشده از پنل ادمین این‌جا فهرست می‌شوند."
        />
        {after.map((s) => (
          <CustomSection key={s.id} section={s} />
        ))}
      </>
    );
  }

  return (
    <>
      {before.map((s) => (
        <CustomSection key={s.id} section={s} />
      ))}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="مقالات" title="مقالات ققنوس" />

          <div className="mt-16 flex flex-col gap-5">
            {articles.map((article, i) => (
              <Reveal key={article.id} delay={i * 0.08}>
                <Link
                  href={`/articles/${article.slug}`}
                  className="group block rounded-lg border border-gold-500/10 bg-black/20 p-7 transition-colors hover:border-gold-500/30"
                >
                  <h2 className="text-xl text-ivory group-hover:text-gold-500">
                    {article.title}
                  </h2>
                  {article.excerpt && (
                    <p className="mt-3 text-sm leading-7 text-ivory/60">
                      {article.excerpt}
                    </p>
                  )}
                  {article.publishedAt && (
                    <p className="mt-4 text-xs text-ivory/40">
                      {new Intl.DateTimeFormat("fa-IR").format(
                        article.publishedAt,
                      )}
                    </p>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {after.map((s) => (
        <CustomSection key={s.id} section={s} />
      ))}
    </>
  );
}
