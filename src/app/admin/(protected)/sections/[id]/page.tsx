import { notFound } from "next/navigation";
import SectionForm from "@/components/admin/SectionForm";
import { updateSection } from "@/lib/actions/sections";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditSectionPage({ params }: Props) {
  const { id } = await params;
  const section = await prisma.section.findUnique({ where: { id } });

  if (!section) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl text-ivory">ویرایش بخش سفارشی</h1>
      <SectionForm
        action={updateSection.bind(null, section.id)}
        defaultValues={section}
        submitLabel="ذخیره تغییرات"
      />
    </div>
  );
}
