import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getForumSession } from "@/lib/forum-auth";
import { logoutForum } from "@/lib/actions/forum-auth";
import { forumCategories } from "@/lib/validations";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "انجمن | استودیو ققنوس",
};

const categoryLabels = Object.fromEntries(
  forumCategories.map((c) => [c.value, c.label]),
);

export default async function ForumPage() {
  const [topics, session] = await Promise.all([
    prisma.forumTopic.findMany({
      orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
      include: { author: true, _count: { select: { replies: true } } },
    }),
    getForumSession(),
  ]);

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="گفت‌وگوی جمعی" title="انجمن ققنوس" />

        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ivory/60">
            {session
              ? `خوش آمدید، ${session.name}`
              : "برای مشارکت باید عضو شوید"}
          </p>
          <div className="flex items-center gap-3">
            {session ? (
              <>
                <Link
                  href="/forum/new"
                  className="rounded-md bg-gold-500 px-5 py-2.5 text-sm font-medium text-maroon-950 hover:opacity-90"
                >
                  موضوع جدید
                </Link>
                <form action={logoutForum}>
                  <button
                    type="submit"
                    className="text-sm text-ivory/60 hover:text-gold-500"
                  >
                    خروج
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/forum/login"
                  className="rounded-md border border-gold-500/30 px-5 py-2.5 text-sm text-gold-500 hover:bg-gold-500/10"
                >
                  ورود
                </Link>
                <Link
                  href="/forum/register"
                  className="rounded-md bg-gold-500 px-5 py-2.5 text-sm font-medium text-maroon-950 hover:opacity-90"
                >
                  ثبت‌نام
                </Link>
              </>
            )}
          </div>
        </Reveal>

        {topics.length === 0 ? (
          <div className="mt-16">
            <PagePlaceholder
              eyebrow="انجمن"
              title="هنوز موضوعی ثبت نشده"
              description="اولین نفری باشید که یک موضوع بحث یا اطلاعیه ثبت می‌کند."
            />
          </div>
        ) : (
          <div className="mt-10 flex flex-col gap-3">
            {topics.map((topic, i) => (
              <Reveal key={topic.id} delay={Math.min(i * 0.05, 0.4)}>
                <Link
                  href={`/forum/${topic.slug}`}
                  className="group block rounded-lg border border-gold-500/10 bg-black/20 p-6 transition-colors hover:border-gold-500/30"
                >
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
                  <h2 className="mt-3 text-lg text-ivory group-hover:text-gold-500">
                    {topic.title}
                  </h2>
                  <p className="mt-2 text-xs text-ivory/50">
                    {topic.author.name} · {topic._count.replies} پاسخ
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
