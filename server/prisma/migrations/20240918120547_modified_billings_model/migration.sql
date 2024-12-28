/*
  Warnings:

  - You are about to drop the column `subtotal` on the `Billings` table. All the data in the column will be lost.
  - Added the required column `serviceProvided` to the `Billings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Billings" DROP COLUMN "subtotal",
ADD COLUMN     "serviceProvided" TEXT NOT NULL;
