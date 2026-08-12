import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  deleteSection,
  toggleSectionStatus,
  moveSection,
} from "@/lib/actions/sections";
import { sectionTargetPages } from "@/lib/validations";
import DeleteButton from "@/components/admin/DeleteButton";

const pageLabels = Object.fromEntries(
  sectionTargetPages.map((p) => [p.value, p.label]),
);

export default async function AdminSectionsPage() {
  const sections = await prisma.section.findMany({
    orderBy: [{ targetPage: "asc" }, { position: "asc" }],
  });

  const groups = new Map<string, typeof sections>();
  for (const section of sections) {
    const list = groups.get(section.targetPage) ?? [];
    list.push(section);
    groups.set(section.targetPage, list);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-ivory">بخش‌های سفارشی</h1>
        <Link
          href="/admin/sections/new"
          className="rounded-md bg-gold-500 px-4 py-2 text-sm font-medium text-maroon-950 hover:opacity-90"
        >
          بخش جدید
        </Link>
      </div>

      {sections.length === 0 && (
        <p className="mt-8 text-sm text-ivory/60">
          هنوز هیچ بخش سفارشی‌ای ثبت نشده است.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-10">
        {[...groups.entries()].map(([targetPage, items]) => (
          <div key={targetPage}>
            <h2 className="mb-3 text-sm tracking-wide text-gold-500">
              {pageLabels[targetPage] ?? targetPage}
            </h2>
            <div className="flex flex-col gap-3">
              {items.map((section, i) => (
                <div
                  key={section.id}
                  className="flex items-center justify-between rounded-lg border border-gold-500/10 bg-black/30 p-4"
                >
                  <div>
                    <p className="text-ivory">{section.title}</p>
                    <p className="mt-1 text-xs text-ivory/50">
                      {section.status === "published" ? "منتشرشده" : "پیش‌نویس"}{" "}
                      · position: {section.position} ·{" "}
                      {section.targetPage === "standalone"
                        ? `/${section.slug}`
                        : `/${section.slug} (اسلاگ)`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <form action={moveSection.bind(null, section.id, "up")}>
                      <button
                        type="submit"
                        disabled={i === 0}
                        aria-label="جابجایی به بالا"
                        className="text-ivory/70 hover:text-gold-500 disabled:opacity-30"
                      >
                        ▲
                      </button>
                    </form>
                    <form action={moveSection.bind(null, section.id, "down")}>
                      <button
                        type="submit"
                        disabled={i === items.length - 1}
                        aria-label="جابجایی به پایین"
                        className="text-ivory/70 hover:text-gold-500 disabled:opacity-30"
                      >
                        ▼
                      </button>
                    </form>
                    <form action={toggleSectionStatus.bind(null, section.id)}>
                      <button
                        type="submit"
                        className="text-sm text-gold-500 hover:opacity-80"
                      >
                        {section.status === "published"
                          ? "پیش‌نویس کن"
                          : "منتشر کن"}
                      </button>
                    </form>
                    <Link
                      href={`/admin/sections/${section.id}`}
                      className="text-sm text-gold-500 hover:opacity-80"
                    >
                      ویرایش
                    </Link>
                    <DeleteButton
                      action={deleteSection.bind(null, section.id)}
                      confirmMessage="این بخش حذف شود؟"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
