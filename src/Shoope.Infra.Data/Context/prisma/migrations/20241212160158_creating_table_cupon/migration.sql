-- CreateTable
CREATE TABLE "Cupon" (
    "id" TEXT NOT NULL,
    "firstText" TEXT,
    "secondText" TEXT,
    "thirdText" TEXT,
    "dateValidateCupon" TIMESTAMP(3),
    "quantityCupons" INTEGER,
    "whatCuponNumber" INTEGER,
    "secondImg" TEXT NOT NULL,
    "secondImgAlt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cupon_pkey" PRIMARY KEY ("id")
);
