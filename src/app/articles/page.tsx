import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  if (articles.length === 0) {
    return (
      <PagePlaceholder
        eyebrow="مقالات"
        title="مقالات ققنوس"
        description="مقالات منتشر شده از پنل ادمین در فاز بعدی این‌جا فهرست می‌شوند."
      />
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="mb-10 text-center font-serif text-4xl text-ivory">
        مقالات
      </h1>
      <ul className="flex flex-col gap-6">
        {articles.map((article) => (
          <li
            key={article.id}
            className="rounded-lg border border-gold-500/10 bg-black/30 p-6"
          >
            <Link href={`/articles/${article.slug}`}>
              <h2 className="font-serif text-xl text-gold-500">
                {article.title}
              </h2>
              {article.excerpt && (
                <p className="mt-2 text-sm text-ivory/70">
                  {article.excerpt}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
