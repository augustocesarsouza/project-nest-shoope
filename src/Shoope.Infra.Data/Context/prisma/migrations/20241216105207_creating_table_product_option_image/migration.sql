-- CreateTable
CREATE TABLE "ProductOptionImage" (
    "id" TEXT NOT NULL,
    "optionType" TEXT NOT NULL,
    "imgAlt" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "titleOptionType" TEXT,
    "productsOfferFlashId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductOptionImage_pkey" PRIMARY KEY ("id")
);
