/*
  Warnings:

  - Added the required column `complaints` to the `PatientConsultations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facial_dermapen_prp` to the `PatientConsultations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructions` to the `PatientConsultations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `laser_q_note` to the `PatientConsultations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prescription` to the `PatientConsultations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_notes` to the `PatientConsultations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recommendations` to the `PatientConsultations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slimming_note` to the `PatientConsultations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PatientConsultations" ADD COLUMN     "complaints" TEXT NOT NULL,
ADD COLUMN     "endTime" TEXT,
ADD COLUMN     "facial_dermapen_prp" TEXT NOT NULL,
ADD COLUMN     "instructions" TEXT NOT NULL,
ADD COLUMN     "laser_q_note" TEXT NOT NULL,
ADD COLUMN     "prescription" TEXT NOT NULL,
ADD COLUMN     "provider_notes" TEXT NOT NULL,
ADD COLUMN     "recommendations" TEXT NOT NULL,
ADD COLUMN     "slimming_note" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT;
