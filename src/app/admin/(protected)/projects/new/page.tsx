import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "@/lib/actions/projects";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl text-ivory">پروژه جدید</h1>
      <ProjectForm action={createProject} submitLabel="ایجاد پروژه" />
    </div>
  );
}
