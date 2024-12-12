/*
  Warnings:

  - Made the column `firstText` on table `Cupon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `secondText` on table `Cupon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thirdText` on table `Cupon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateValidateCupon` on table `Cupon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantityCupons` on table `Cupon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `whatCuponNumber` on table `Cupon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cupon" ALTER COLUMN "firstText" SET NOT NULL,
ALTER COLUMN "secondText" SET NOT NULL,
ALTER COLUMN "thirdText" SET NOT NULL,
ALTER COLUMN "dateValidateCupon" SET NOT NULL,
ALTER COLUMN "quantityCupons" SET NOT NULL,
ALTER COLUMN "whatCuponNumber" SET NOT NULL,
ALTER COLUMN "secondImg" DROP NOT NULL,
ALTER COLUMN "secondImgAlt" DROP NOT NULL;
