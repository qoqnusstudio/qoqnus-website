import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });

  if (!article || !article.published) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="font-serif text-4xl text-ivory">{article.title}</h1>
      <div className="prose prose-invert mt-8 max-w-none leading-8 text-ivory/80">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
