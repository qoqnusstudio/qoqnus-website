-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "targetPage" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Section_slug_key" ON "Section"("slug");

-- CreateIndex
CREATE INDEX "Section_targetPage_status_position_idx" ON "Section"("targetPage", "status", "position");
