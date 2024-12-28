/*
  Warnings:

  - You are about to drop the `_BillingsToConsultations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BillingsToConsultations" DROP CONSTRAINT "_BillingsToConsultations_A_fkey";

-- DropForeignKey
ALTER TABLE "_BillingsToConsultations" DROP CONSTRAINT "_BillingsToConsultations_B_fkey";

-- DropTable
DROP TABLE "_BillingsToConsultations";

-- CreateTable
CREATE TABLE "_BillingsToPatientConsultations" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BillingsToPatientConsultations_AB_unique" ON "_BillingsToPatientConsultations"("A", "B");

-- CreateIndex
CREATE INDEX "_BillingsToPatientConsultations_B_index" ON "_BillingsToPatientConsultations"("B");

-- AddForeignKey
ALTER TABLE "_BillingsToPatientConsultations" ADD CONSTRAINT "_BillingsToPatientConsultations_A_fkey" FOREIGN KEY ("A") REFERENCES "Billings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BillingsToPatientConsultations" ADD CONSTRAINT "_BillingsToPatientConsultations_B_fkey" FOREIGN KEY ("B") REFERENCES "PatientConsultations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
