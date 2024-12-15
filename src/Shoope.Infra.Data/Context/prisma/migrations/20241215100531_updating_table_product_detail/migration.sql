/*
  Warnings:

  - Made the column `promotionalStock` on table `ProductDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalStock` on table `ProductDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sendingOf` on table `ProductDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `ProductDetail` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductDetail" ALTER COLUMN "promotionalStock" SET NOT NULL,
ALTER COLUMN "totalStock" SET NOT NULL,
ALTER COLUMN "sendingOf" SET NOT NULL,
ALTER COLUMN "mark" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "warrantlyDuration" DROP NOT NULL,
ALTER COLUMN "warrantlyType" DROP NOT NULL,
ALTER COLUMN "productWeight" DROP NOT NULL,
ALTER COLUMN "energyConsumption" DROP NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "material" DROP NOT NULL,
ALTER COLUMN "productId" SET NOT NULL;
