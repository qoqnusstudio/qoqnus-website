import { prisma } from "@/lib/prisma";

export async function getPublishedSections(targetPage: string) {
  return prisma.section.findMany({
    where: { targetPage, status: "published" },
    orderBy: { position: "asc" },
  });
}
