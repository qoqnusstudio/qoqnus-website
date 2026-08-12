import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProject } from "@/lib/actions/projects";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-ivory">پروژه‌ها</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-md bg-gold-500 px-4 py-2 text-sm font-medium text-maroon-950 hover:opacity-90"
        >
          پروژه جدید
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {projects.length === 0 && (
          <p className="text-sm text-ivory/60">هنوز پروژه‌ای ثبت نشده است.</p>
        )}
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between rounded-lg border border-gold-500/10 bg-black/30 p-4"
          >
            <div>
              <p className="text-ivory">{project.title}</p>
              <p className="mt-1 text-xs text-ivory/50">
                {project.published ? "منتشرشده" : "پیش‌نویس"} · /{project.slug}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/projects/${project.id}`}
                className="text-sm text-gold-500 hover:opacity-80"
              >
                ویرایش
              </Link>
              <DeleteButton
                action={deleteProject.bind(null, project.id)}
                confirmMessage="این پروژه حذف شود؟"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
