import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import CustomSection from "@/components/sections/CustomSection";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getStandaloneSection(slug: string) {
  const section = await prisma.section.findUnique({ where: { slug } });
  if (!section || section.targetPage !== "standalone") return null;
  return section;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const section = await getStandaloneSection(slug);
  return { title: section ? `${section.title} | استودیو ققنوس` : "ققنوس" };
}

export default async function StandaloneSectionPage({ params }: Props) {
  const { slug } = await params;
  const section = await getStandaloneSection(slug);

  if (!section) {
    notFound();
  }

  if (section.status === "draft") {
    const session = await getSession();
    if (!session) {
      notFound();
    }
  }

  return (
    <div className="pt-10">
      {section.status === "draft" && (
        <p className="mx-auto mb-4 w-fit rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-xs text-gold-500">
          پیش‌نویس — فقط برای شما قابل‌مشاهده است
        </p>
      )}
      <h1 className="px-6 text-center text-4xl text-ivory sm:text-5xl">
        {section.title}
      </h1>
      <CustomSection section={section} showTitle={false} />
    </div>
  );
}
