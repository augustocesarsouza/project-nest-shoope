-- CreateTable
CREATE TABLE "ProductDiscoveriesOfDay" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imgProduct" TEXT NOT NULL,
    "imgPartBottom" TEXT,
    "discountPercentage" INTEGER NOT NULL,
    "isAd" BOOLEAN NOT NULL,
    "price" INTEGER NOT NULL,
    "quantitySold" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductDiscoveriesOfDay_pkey" PRIMARY KEY ("id")
);
