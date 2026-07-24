import { notFound } from "next/navigation";
import ArticleForm from "@/components/admin/ArticleForm";
import { updateArticle } from "@/lib/actions/articles";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl text-ivory">ویرایش مقاله</h1>
      <ArticleForm
        action={updateArticle.bind(null, article.id)}
        defaultValues={article}
        submitLabel="ذخیره تغییرات"
      />
    </div>
  );
}
