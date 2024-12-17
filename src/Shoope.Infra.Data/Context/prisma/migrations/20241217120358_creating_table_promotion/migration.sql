-- CreateTable
CREATE TABLE "Promotion" (
    "id" TEXT NOT NULL,
    "whatIsThePromotion" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "img" TEXT NOT NULL,
    "imgInnerFirst" TEXT,
    "altImgInnerFirst" TEXT,
    "imgInnerSecond" TEXT,
    "altImgInnerSecond" TEXT,
    "imgInnerThird" TEXT,
    "altImgInnerThird" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);
