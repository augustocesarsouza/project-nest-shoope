-- CreateTable
CREATE TABLE "FlashSaleProductAllInfo" (
    "id" TEXT NOT NULL,
    "productReviewsRate" INTEGER NOT NULL,
    "quantitySold" INTEGER NOT NULL,
    "favoriteQuantity" INTEGER NOT NULL,
    "quantityAvaliation" INTEGER NOT NULL,
    "coins" INTEGER,
    "creditCard" INTEGER,
    "voltage" TEXT,
    "quantityPiece" INTEGER,
    "size" TEXT,
    "productHaveInsurance" BOOLEAN,
    "productsOfferFlashId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlashSaleProductAllInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FlashSaleProductAllInfo" ADD CONSTRAINT "FlashSaleProductAllInfo_productsOfferFlashId_fkey" FOREIGN KEY ("productsOfferFlashId") REFERENCES "ProductsOfferFlash"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
