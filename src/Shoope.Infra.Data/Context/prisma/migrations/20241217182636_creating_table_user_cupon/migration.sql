-- CreateTable
CREATE TABLE "UserCupon" (
    "id" TEXT NOT NULL,
    "cuponId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCupon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCupon" ADD CONSTRAINT "UserCupon_cuponId_fkey" FOREIGN KEY ("cuponId") REFERENCES "Cupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCupon" ADD CONSTRAINT "UserCupon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
