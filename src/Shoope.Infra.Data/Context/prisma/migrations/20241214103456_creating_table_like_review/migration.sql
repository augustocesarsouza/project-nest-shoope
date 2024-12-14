-- CreateTable
CREATE TABLE "LikeReview" (
    "id" TEXT NOT NULL,
    "productFlashSaleReviewsId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LikeReview_pkey" PRIMARY KEY ("id")
);
