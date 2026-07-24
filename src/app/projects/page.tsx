import { prisma } from "@/lib/prisma";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  if (projects.length === 0) {
    return (
      <PagePlaceholder
        eyebrow="نمونه کارها"
        title="پروژه‌های ما"
        description="گرید کارت‌های پروژه (قابل مدیریت از پنل ادمین) در فاز بعدی این‌جا نمایش داده می‌شود."
      />
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="mb-10 text-center font-serif text-4xl text-ivory">
        پروژه‌های ما
      </h1>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li
            key={project.id}
            className="rounded-lg border border-gold-500/10 bg-black/30 p-6"
          >
            <h2 className="font-serif text-xl text-gold-500">
              {project.title}
            </h2>
            <p className="mt-2 text-sm text-ivory/70">
              {project.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
