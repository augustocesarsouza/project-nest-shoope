-- CreateTable
CREATE TABLE "ProductsOfferFlashDTO" (
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

    CONSTRAINT "ProductsOfferFlashDTO_pkey" PRIMARY KEY ("id")
);
