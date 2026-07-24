import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteArticle } from "@/lib/actions/articles";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-ivory">مقالات</h1>
        <Link
          href="/admin/articles/new"
          className="rounded-md bg-gold-500 px-4 py-2 text-sm font-medium text-maroon-950 hover:opacity-90"
        >
          مقاله جدید
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {articles.length === 0 && (
          <p className="text-sm text-ivory/60">هنوز مقاله‌ای ثبت نشده است.</p>
        )}
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex items-center justify-between rounded-lg border border-gold-500/10 bg-black/30 p-4"
          >
            <div>
              <p className="text-ivory">{article.title}</p>
              <p className="mt-1 text-xs text-ivory/50">
                {article.published ? "منتشرشده" : "پیش‌نویس"} · /{article.slug}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/articles/${article.id}`}
                className="text-sm text-gold-500 hover:opacity-80"
              >
                ویرایش
              </Link>
              <DeleteButton
                action={deleteArticle.bind(null, article.id)}
                confirmMessage="این مقاله حذف شود؟"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
