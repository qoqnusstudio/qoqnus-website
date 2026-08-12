import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/ui/Reveal";

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
    <div className="px-6 py-28">
      <article className="mx-auto max-w-2xl">
        {article.coverImage && (
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverImage}
              alt={article.title}
              className="mb-10 h-72 w-full rounded-lg object-cover"
            />
          </Reveal>
        )}
        <Reveal delay={0.1}>
          <h1 className="text-4xl text-ivory">{article.title}</h1>
          {article.publishedAt && (
            <p className="mt-4 text-xs text-ivory/40">
              {new Intl.DateTimeFormat("fa-IR").format(article.publishedAt)}
            </p>
          )}
          <div className="prose prose-invert mt-8 max-w-none leading-8 text-ivory/80 prose-headings:prose-headings:text-ivory prose-a:text-gold-500 prose-strong:text-ivory">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>
        </Reveal>
      </article>
    </div>
  );
}
