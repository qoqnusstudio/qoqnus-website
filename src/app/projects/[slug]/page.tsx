import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/ui/Reveal";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project || !project.published) {
    notFound();
  }

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-3xl">
        {project.coverImage && (
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.coverImage}
              alt={project.title}
              className="mb-10 h-72 w-full rounded-lg object-cover"
            />
          </Reveal>
        )}
        <Reveal delay={0.1}>
          {project.tag && (
            <span className="rounded-full bg-gold-500/10 px-3 py-1 text-xs text-gold-500">
              {project.tag}
            </span>
          )}
          <h1 className="mt-4 text-4xl text-ivory">{project.title}</h1>
          <p className="mt-6 text-sm leading-8 text-ivory/70">
            {project.description}
          </p>
        </Reveal>

        {project.coverVideo && (
          <Reveal
            delay={0.2}
            className="mt-10 aspect-video overflow-hidden rounded-lg border border-gold-500/10"
          >
            <iframe
              src={project.coverVideo}
              title={project.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
