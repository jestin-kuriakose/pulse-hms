/*
  Warnings:

  - Made the column `patientId` on table `Triage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Triage" DROP CONSTRAINT "Triage_patientId_fkey";

-- AlterTable
ALTER TABLE "Triage" ALTER COLUMN "patientId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Triage" ADD CONSTRAINT "Triage_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
