import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { updateProject } from "@/lib/actions/projects";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl text-ivory">ویرایش پروژه</h1>
      <ProjectForm
        action={updateProject.bind(null, project.id)}
        defaultValues={project}
        submitLabel="ذخیره تغییرات"
      />
    </div>
  );
}
