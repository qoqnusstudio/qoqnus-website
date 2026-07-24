import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

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
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-serif text-4xl text-ivory">{project.title}</h1>
      <p className="mt-6 text-sm leading-8 text-ivory/70">
        {project.description}
      </p>
    </section>
  );
}
