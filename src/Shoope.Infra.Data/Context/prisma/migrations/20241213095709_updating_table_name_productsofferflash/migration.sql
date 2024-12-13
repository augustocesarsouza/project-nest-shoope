/*
  Warnings:

  - You are about to drop the `ProductsOfferFlashDTO` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ProductsOfferFlashDTO";

-- CreateTable
CREATE TABLE "ProductsOfferFlash" (
    "id" TEXT NOT NULL,
    "imgProduct" TEXT NOT NULL,
    "altValue" TEXT NOT NULL,
    "imgPartBottom" TEXT,
    "priceProduct" INTEGER NOT NULL,
    "popularityPercentage" INTEGER NOT NULL,
    "discountPercentage" INTEGER NOT NULL,
    "hourFlashOffer" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tagProduct" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductsOfferFlash_pkey" PRIMARY KEY ("id")
);
