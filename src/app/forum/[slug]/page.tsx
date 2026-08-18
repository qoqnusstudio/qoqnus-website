import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prisma } from "@/lib/prisma";
import { getForumSession } from "@/lib/forum-auth";
import { getSession } from "@/lib/auth";
import {
  deleteTopic,
  deleteReply,
  togglePinTopic,
  toggleLockTopic,
} from "@/lib/actions/forum";
import { forumCategories } from "@/lib/validations";
import Reveal from "@/components/ui/Reveal";
import DeleteButton from "@/components/admin/DeleteButton";
import ReplyForm from "@/components/forum/ReplyForm";

const categoryLabels = Object.fromEntries(
  forumCategories.map((c) => [c.value, c.label]),
);

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = await prisma.forumTopic.findUnique({ where: { slug } });
  return { title: topic ? `${topic.title} | انجمن ققنوس` : "انجمن ققنوس" };
}

export default async function ForumTopicPage({ params }: Props) {
  const { slug } = await params;

  const [topic, forumSession, adminSession] = await Promise.all([
    prisma.forumTopic.findUnique({
      where: { slug },
      include: {
        author: true,
        replies: { include: { author: true }, orderBy: { createdAt: "asc" } },
      },
    }),
    getForumSession(),
    getSession(),
  ]);

  if (!topic) {
    notFound();
  }

  const canManageTopic =
    forumSession?.userId === topic.authorId || !!adminSession;

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            {topic.pinned && (
              <span className="rounded-full bg-gold-500/15 px-3 py-1 text-xs text-gold-500">
                سنجاق‌شده
              </span>
            )}
            {topic.locked && (
              <span className="rounded-full bg-black/30 px-3 py-1 text-xs text-ivory/50">
                بسته‌شده
              </span>
            )}
            <span className="rounded-full border border-gold-500/20 px-3 py-1 text-xs text-ivory/60">
              {categoryLabels[topic.category] ?? topic.category}
            </span>
          </div>

          <h1 className="mt-4 text-3xl text-ivory sm:text-4xl">
            {topic.title}
          </h1>
          <p className="mt-3 text-xs text-ivory/40">
            {topic.author.name} ·{" "}
            {new Intl.DateTimeFormat("fa-IR").format(topic.createdAt)}
          </p>

          <div className="prose prose-invert mt-8 max-w-none leading-8 text-ivory/80 prose-headings:text-ivory prose-a:text-gold-500 prose-strong:text-ivory">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {topic.content}
            </ReactMarkdown>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {adminSession && (
              <>
                <form action={togglePinTopic.bind(null, topic.id)}>
                  <button
                    type="submit"
                    className="text-sm text-gold-500 hover:opacity-80"
                  >
                    {topic.pinned ? "برداشتن سنجاق" : "سنجاق‌کردن"}
                  </button>
                </form>
                <form action={toggleLockTopic.bind(null, topic.id)}>
                  <button
                    type="submit"
                    className="text-sm text-gold-500 hover:opacity-80"
                  >
                    {topic.locked ? "بازکردن موضوع" : "بستن موضوع"}
                  </button>
                </form>
              </>
            )}
            {canManageTopic && (
              <DeleteButton
                action={deleteTopic.bind(null, topic.id)}
                confirmMessage="این موضوع و همه‌ی پاسخ‌هایش حذف شود؟"
              />
            )}
          </div>
        </Reveal>

        <hr className="my-10 border-gold-500/10" />

        <h2 className="mb-6 text-xl text-ivory">
          پاسخ‌ها ({topic.replies.length})
        </h2>

        <div className="flex flex-col gap-4">
          {topic.replies.map((reply) => {
            const canManageReply =
              forumSession?.userId === reply.authorId || !!adminSession;
            return (
              <div
                key={reply.id}
                className="rounded-lg border border-gold-500/10 bg-black/20 p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs text-ivory/50">
                    {reply.author.name} ·{" "}
                    {new Intl.DateTimeFormat("fa-IR").format(reply.createdAt)}
                  </p>
                  {canManageReply && (
                    <DeleteButton
                      action={deleteReply.bind(null, reply.id)}
                      confirmMessage="این پاسخ حذف شود؟"
                    />
                  )}
                </div>
                <p className="mt-3 text-sm leading-7 text-ivory/80">
                  {reply.content}
                </p>
              </div>
            );
          })}
          {topic.replies.length === 0 && (
            <p className="text-sm text-ivory/50">هنوز پاسخی ثبت نشده است.</p>
          )}
        </div>

        {forumSession && !topic.locked && <ReplyForm topicId={topic.id} />}
        {!forumSession && (
          <p className="mt-6 text-sm text-ivory/60">
            برای پاسخ‌دادن باید عضو انجمن باشید.
          </p>
        )}
      </div>
    </section>
  );
}
