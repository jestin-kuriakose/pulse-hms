/*
  Warnings:

  - You are about to drop the column `time` on the `Appointments` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `Consultations` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Consultations` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Consultations` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Consultations` table. All the data in the column will be lost.
  - You are about to drop the column `nationalID` on the `Consultations` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Consultations` table. All the data in the column will be lost.
  - You are about to drop the column `appointmentId` on the `Triage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mrNumber]` on the table `Patients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mrNumber` to the `Patients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Triage" DROP CONSTRAINT "Triage_appointmentId_fkey";

-- DropIndex
DROP INDEX "Consultations_email_key";

-- AlterTable
ALTER TABLE "Appointments" DROP COLUMN "time",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Availability" ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Consultations" DROP COLUMN "dob",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "nationalID",
DROP COLUMN "phoneNumber",
ADD COLUMN     "appointmentId" INTEGER,
ADD COLUMN     "doctorId" INTEGER,
ADD COLUMN     "patientId" INTEGER,
ADD COLUMN     "triageId" INTEGER;

-- AlterTable
ALTER TABLE "Patients" ADD COLUMN     "doctorId" INTEGER,
ADD COLUMN     "mrNumber" TEXT NOT NULL,
ALTER COLUMN "middleName" DROP NOT NULL,
ALTER COLUMN "nationality" DROP NOT NULL,
ALTER COLUMN "maritalStatus" DROP NOT NULL,
ALTER COLUMN "dob" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "district" DROP NOT NULL,
ALTER COLUMN "emirate" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "visaType" DROP NOT NULL,
ALTER COLUMN "nationalID" DROP NOT NULL,
ALTER COLUMN "otherID" DROP NOT NULL,
ALTER COLUMN "emergencyContactNumber" DROP NOT NULL,
ALTER COLUMN "emergencyContactName" DROP NOT NULL,
ALTER COLUMN "emergencyContactRelationship" DROP NOT NULL,
ALTER COLUMN "allergies" DROP NOT NULL,
ALTER COLUMN "profilePicture" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Triage" DROP COLUMN "appointmentId",
ADD COLUMN     "patientId" INTEGER,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "priority" DROP NOT NULL,
ALTER COLUMN "startTime" DROP NOT NULL,
ALTER COLUMN "endTime" DROP NOT NULL,
ALTER COLUMN "immunizationUpToDate" DROP NOT NULL,
ALTER COLUMN "immunizationRemarks" DROP NOT NULL,
ALTER COLUMN "systolic" DROP NOT NULL,
ALTER COLUMN "diastolic" DROP NOT NULL,
ALTER COLUMN "temperature" DROP NOT NULL,
ALTER COLUMN "height" DROP NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL,
ALTER COLUMN "spO2" DROP NOT NULL,
ALTER COLUMN "bmi" DROP NOT NULL,
ALTER COLUMN "pulse" DROP NOT NULL,
ALTER COLUMN "pastMedicalHistory" DROP NOT NULL,
ALTER COLUMN "familyHistory" DROP NOT NULL,
ALTER COLUMN "socialHistory" DROP NOT NULL,
ALTER COLUMN "surgicalHistory" DROP NOT NULL,
ALTER COLUMN "creams" DROP NOT NULL,
ALTER COLUMN "nurseAssessment" DROP NOT NULL,
ALTER COLUMN "medications" DROP NOT NULL,
ALTER COLUMN "otherNotes" DROP NOT NULL,
ALTER COLUMN "painScale" DROP NOT NULL,
ALTER COLUMN "currentHistory" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Patients_mrNumber_key" ON "Patients"("mrNumber");

-- AddForeignKey
ALTER TABLE "Consultations" ADD CONSTRAINT "Consultations_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultations" ADD CONSTRAINT "Consultations_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultations" ADD CONSTRAINT "Consultations_triageId_fkey" FOREIGN KEY ("triageId") REFERENCES "Triage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Triage" ADD CONSTRAINT "Triage_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
