/*
  Warnings:

  - You are about to drop the column `created_at` on the `Billings` table. All the data in the column will be lost.
  - You are about to drop the column `serviceProvided` on the `Billings` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Billings` table. All the data in the column will be lost.
  - Added the required column `subtotal` to the `Billings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Billings" DROP CONSTRAINT "Billings_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Billings" DROP CONSTRAINT "Billings_patientId_fkey";

-- AlterTable
ALTER TABLE "Billings" DROP COLUMN "created_at",
DROP COLUMN "serviceProvided",
DROP COLUMN "updated_at",
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "discount" DROP DEFAULT,
ALTER COLUMN "previousBalance" DROP DEFAULT,
ALTER COLUMN "paymentMade" DROP DEFAULT,
ALTER COLUMN "paymentMade" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Treatment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "billingId" INTEGER,

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicine" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "billingId" INTEGER,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BillingsToConsultations" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BillingsToConsultations_AB_unique" ON "_BillingsToConsultations"("A", "B");

-- CreateIndex
CREATE INDEX "_BillingsToConsultations_B_index" ON "_BillingsToConsultations"("B");

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "Billings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "Billings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BillingsToConsultations" ADD CONSTRAINT "_BillingsToConsultations_A_fkey" FOREIGN KEY ("A") REFERENCES "Billings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BillingsToConsultations" ADD CONSTRAINT "_BillingsToConsultations_B_fkey" FOREIGN KEY ("B") REFERENCES "Consultations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
