-- CreateTable
CREATE TABLE "ProductDetail" (
    "id" TEXT NOT NULL,
    "promotionalStock" INTEGER,
    "totalStock" INTEGER,
    "sendingOf" TEXT,
    "mark" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "warrantlyDuration" TEXT NOT NULL,
    "warrantlyType" TEXT NOT NULL,
    "productWeight" TEXT NOT NULL,
    "energyConsumption" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "productId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductDetail_pkey" PRIMARY KEY ("id")
);
