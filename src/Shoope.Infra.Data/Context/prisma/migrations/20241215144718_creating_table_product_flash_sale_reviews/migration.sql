-- CreateTable
CREATE TABLE "ProductFlashSaleReviews" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "costBenefit" TEXT NOT NULL,
    "similarToAd" TEXT NOT NULL,
    "starQuantity" INTEGER NOT NULL,
    "productsOfferFlashId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imgAndVideoReviewsProduct" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "variation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductFlashSaleReviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductFlashSaleReviews" ADD CONSTRAINT "ProductFlashSaleReviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
