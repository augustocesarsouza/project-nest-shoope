-- CreateTable
CREATE TABLE "ProductDescription" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characteristics" TEXT[],
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductDescription_pkey" PRIMARY KEY ("id")
);
