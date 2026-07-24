import { prisma } from "@/lib/prisma";
import PagePlaceholder from "@/components/ui/PagePlaceholder";
import { getEmbedUrl } from "@/lib/video";

export default async function VideosPage() {
  const videos = await prisma.video.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  if (videos.length === 0) {
    return (
      <PagePlaceholder
        eyebrow="ویدیوها"
        title="ویدیوهای ققنوس"
        description="ویدیوهای منتشر شده از یوتیوب و آپارات، مدیریت‌شده از پنل ادمین، در فاز بعدی این‌جا نمایش داده می‌شوند."
      />
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="mb-10 text-center font-serif text-4xl text-ivory">
        ویدیوها
      </h1>
      <ul className="grid gap-8 sm:grid-cols-2">
        {videos.map((video) => {
          const embedUrl = getEmbedUrl(video.platform, video.url);
          return (
            <li key={video.id}>
              <h2 className="mb-3 font-serif text-lg text-gold-500">
                {video.title}
              </h2>
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
            </li>
          );
        })}
      </ul>
    </section>
  );
}
