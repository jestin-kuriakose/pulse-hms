/*
  Warnings:

  - You are about to drop the column `image` on the `PatientConsultations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PatientConsultations" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];
