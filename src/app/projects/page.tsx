import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PagePlaceholder from "@/components/ui/PagePlaceholder";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CustomSection from "@/components/sections/CustomSection";
import { getPublishedSections } from "@/lib/sections";

export const metadata: Metadata = {
  title: "پروژه‌ها | استودیو ققنوس",
};

export default async function ProjectsPage() {
  const [projects, sections] = await Promise.all([
    prisma.project.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
    getPublishedSections("projects"),
  ]);
  const before = sections.filter((s) => s.position < 0);
  const after = sections.filter((s) => s.position >= 0);

  if (projects.length === 0) {
    return (
      <>
        {before.map((s) => (
          <CustomSection key={s.id} section={s} />
        ))}
        <PagePlaceholder
          eyebrow="نمونه کارها"
          title="پروژه‌های ما"
          description="پروژه‌های منتشرشده از پنل ادمین این‌جا نمایش داده می‌شوند."
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
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="نمونه کارها" title="پروژه‌های ما" />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.06}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block h-full overflow-hidden rounded-lg border border-gold-500/10 bg-black/20 transition-colors hover:border-gold-500/30"
                >
                  <div className="flex h-40 items-center justify-center bg-gradient-to-br from-maroon-800 to-maroon-950">
                    {project.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl text-gold-500/40">ققنوس</span>
                    )}
                  </div>
                  <div className="p-6">
                    {project.tag && (
                      <span className="rounded-full bg-gold-500/10 px-3 py-1 text-xs text-gold-500">
                        {project.tag}
                      </span>
                    )}
                    <h2 className="mt-4 text-lg text-ivory group-hover:text-gold-500">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-ivory/60">
                      {project.description}
                    </p>
                  </div>
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
