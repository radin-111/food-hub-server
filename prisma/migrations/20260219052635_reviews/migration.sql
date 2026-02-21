/*
  Warnings:

  - You are about to drop the column `providerProfilesId` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `providerId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_providerProfilesId_fkey";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "providerProfilesId",
ADD COLUMN     "providerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "provider_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
