import SectionForm from "@/components/admin/SectionForm";
import { createSection } from "@/lib/actions/sections";

export default function NewSectionPage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl text-ivory">بخش سفارشی جدید</h1>
      <SectionForm action={createSection} submitLabel="ایجاد بخش" />
    </div>
  );
}
