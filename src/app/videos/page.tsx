import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PagePlaceholder from "@/components/ui/PagePlaceholder";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { getEmbedUrl } from "@/lib/video";
import CustomSection from "@/components/sections/CustomSection";
import { getPublishedSections } from "@/lib/sections";

export const metadata: Metadata = {
  title: "ویدیوها | استودیو ققنوس",
};

export default async function VideosPage() {
  const [videos, sections] = await Promise.all([
    prisma.video.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
    getPublishedSections("videos"),
  ]);
  const before = sections.filter((s) => s.position < 0);
  const after = sections.filter((s) => s.position >= 0);

  if (videos.length === 0) {
    return (
      <>
        {before.map((s) => (
          <CustomSection key={s.id} section={s} />
        ))}
        <PagePlaceholder
          eyebrow="ویدیوها"
          title="ویدیوهای ققنوس"
          description="ویدیوهای منتشرشده از یوتیوب و آپارات این‌جا نمایش داده می‌شوند."
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
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="ویدیوها" title="ویدیوهای ققنوس" />

          <div className="mt-16 grid gap-10 sm:grid-cols-2">
            {videos.map((video, i) => {
              const embedUrl = getEmbedUrl(video.platform, video.url);
              return (
                <Reveal key={video.id} delay={i * 0.1}>
                  <h2 className="mb-3 text-lg text-gold-500">{video.title}</h2>
                  {video.description && (
                    <p className="mb-3 text-sm leading-6 text-ivory/60">
                      {video.description}
                    </p>
                  )}
                  {embedUrl && (
                    <div className="aspect-video overflow-hidden rounded-lg border border-gold-500/10">
                      <iframe
                        src={embedUrl}
                        title={video.title}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      {after.map((s) => (
        <CustomSection key={s.id} section={s} />
      ))}
    </>
  );
}
