/*
  Warnings:

  - Changed the type of `cuisineType` on the `category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "cuisineType",
ADD COLUMN     "cuisineType" TEXT NOT NULL;

-- DropEnum
DROP TYPE "CuisineType";
