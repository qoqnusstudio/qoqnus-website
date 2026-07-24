import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default async function ProjectsPreview() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    take: 3,
  });

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="نمونه کارها" title="پروژه‌های ما" />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1}>
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
                  <h3 className="mt-4 text-lg text-ivory group-hover:text-gold-500">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ivory/60">
                    {project.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Link
            href="/projects"
            className="text-sm text-gold-500 underline decoration-gold-500/30 underline-offset-4 transition-colors hover:decoration-gold-500"
          >
            همه پروژه‌ها
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
