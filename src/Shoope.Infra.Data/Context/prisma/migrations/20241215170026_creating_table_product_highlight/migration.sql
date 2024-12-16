-- CreateTable
CREATE TABLE "ProductHighlight" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imgProduct" TEXT NOT NULL,
    "imgTop" TEXT NOT NULL,
    "quantitySold" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductHighlight_pkey" PRIMARY KEY ("id")
);
