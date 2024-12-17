/*
  Warnings:

  - Changed the type of `whatIsThePromotion` on the `Promotion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "whatIsThePromotion",
ADD COLUMN     "whatIsThePromotion" INTEGER NOT NULL;
