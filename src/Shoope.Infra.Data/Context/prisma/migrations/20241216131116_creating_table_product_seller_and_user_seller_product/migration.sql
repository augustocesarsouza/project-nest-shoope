-- CreateTable
CREATE TABLE "ProductSeller" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userSellerProductId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductSeller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSellerProduct" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imgPerfil" TEXT NOT NULL,
    "imgFloating" TEXT,
    "lastLogin" TIMESTAMP(3),
    "reviews" INTEGER,
    "chatResponseRate" INTEGER,
    "accountCreationDate" TIMESTAMP(3) NOT NULL,
    "quantityOfProductSold" INTEGER,
    "usuallyRespondsToChatIn" TEXT,
    "followers" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSellerProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductSeller" ADD CONSTRAINT "ProductSeller_userSellerProductId_fkey" FOREIGN KEY ("userSellerProductId") REFERENCES "UserSellerProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
