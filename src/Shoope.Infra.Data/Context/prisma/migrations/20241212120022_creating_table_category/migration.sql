-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "imgCategory" TEXT NOT NULL,
    "altValue" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
