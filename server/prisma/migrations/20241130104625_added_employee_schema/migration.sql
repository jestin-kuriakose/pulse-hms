/*
  Warnings:

  - You are about to drop the column `allergy` on the `Allergy` table. All the data in the column will be lost.
  - You are about to drop the column `reaction` on the `Allergy` table. All the data in the column will be lost.
  - You are about to drop the column `se` on the `Allergy` table. All the data in the column will be lost.
  - You are about to drop the column `st` on the `Allergy` table. All the data in the column will be lost.
  - You are about to drop the column `triageId` on the `Allergy` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Allergy` table. All the data in the column will be lost.
  - You are about to drop the column `billingId` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `billingId` on the `Treatment` table. All the data in the column will be lost.
  - You are about to drop the column `triageId` on the `TriageProblem` table. All the data in the column will be lost.
  - You are about to drop the `PatientConsultations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Triage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BillingsToPatientConsultations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Allergy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryCode` to the `Appointments` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `Appointments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `status` to the `Consultations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryCode` to the `Patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Treatment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Allergy" DROP CONSTRAINT "Allergy_triageId_fkey";

-- DropForeignKey
ALTER TABLE "Billings" DROP CONSTRAINT "Billings_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Billings" DROP CONSTRAINT "Billings_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_billingId_fkey";

-- DropForeignKey
ALTER TABLE "PatientConsultations" DROP CONSTRAINT "PatientConsultations_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "PatientConsultations" DROP CONSTRAINT "PatientConsultations_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_billingId_fkey";

-- DropForeignKey
ALTER TABLE "TriageProblem" DROP CONSTRAINT "TriageProblem_problemId_fkey";

-- DropForeignKey
ALTER TABLE "TriageProblem" DROP CONSTRAINT "TriageProblem_triageId_fkey";

-- DropForeignKey
ALTER TABLE "_BillingsToPatientConsultations" DROP CONSTRAINT "_BillingsToPatientConsultations_A_fkey";

-- DropForeignKey
ALTER TABLE "_BillingsToPatientConsultations" DROP CONSTRAINT "_BillingsToPatientConsultations_B_fkey";

-- AlterTable
ALTER TABLE "Allergy" DROP COLUMN "allergy",
DROP COLUMN "reaction",
DROP COLUMN "se",
DROP COLUMN "st",
DROP COLUMN "triageId",
DROP COLUMN "type",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN     "countryCode" TEXT NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Billings" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pending',
ALTER COLUMN "patientId" DROP NOT NULL,
ALTER COLUMN "doctorId" DROP NOT NULL,
ALTER COLUMN "total" DROP NOT NULL,
ALTER COLUMN "tax" DROP NOT NULL,
ALTER COLUMN "tax" SET DEFAULT 0.00,
ALTER COLUMN "discount" DROP NOT NULL,
ALTER COLUMN "previousBalance" DROP NOT NULL,
ALTER COLUMN "paymentMade" DROP NOT NULL,
ALTER COLUMN "subtotal" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Consultations" ADD COLUMN     "billingId" INTEGER,
ADD COLUMN     "patientAssessmentId" INTEGER,
ADD COLUMN     "patientTriageId" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "billingId",
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Patients" ADD COLUMN     "appointmentId" INTEGER,
ADD COLUMN     "countryCode" TEXT NOT NULL,
ADD COLUMN     "source" TEXT;

-- AlterTable
ALTER TABLE "Treatment" DROP COLUMN "billingId",
ADD COLUMN     "code" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TriageProblem" DROP COLUMN "triageId",
ADD COLUMN     "patientTriageId" INTEGER,
ALTER COLUMN "problemId" DROP NOT NULL;

-- DropTable
DROP TABLE "PatientConsultations";

-- DropTable
DROP TABLE "Triage";

-- DropTable
DROP TABLE "Users";

-- DropTable
DROP TABLE "_BillingsToPatientConsultations";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "department" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "hireDate" TIMESTAMP(3) NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "phoneNumber" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "details" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TriageAllergy" (
    "id" SERIAL NOT NULL,
    "patientTriageId" INTEGER,
    "allergyId" INTEGER,

    CONSTRAINT "TriageAllergy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientTriage" (
    "id" SERIAL NOT NULL,
    "status" TEXT,
    "priority" TEXT,
    "immunizationUpToDate" TEXT,
    "immunizationRemarks" TEXT,
    "allergenHistory" TEXT,
    "systolic" TEXT,
    "diastolic" TEXT,
    "temperature" TEXT,
    "height" TEXT,
    "weight" TEXT,
    "spO2" TEXT,
    "bmi" TEXT,
    "pulse" TEXT,
    "pastMedicalHistory" TEXT,
    "familyHistory" TEXT,
    "socialHistory" TEXT,
    "surgicalHistory" TEXT,
    "creams" TEXT,
    "nurseAssessment" TEXT,
    "medications" TEXT,
    "otherNotes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "painScale" INTEGER,
    "currentHistory" TEXT,

    CONSTRAINT "PatientTriage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientAssessment" (
    "id" SERIAL NOT NULL,
    "visitType" TEXT,
    "consultationType" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "complaints" TEXT,
    "facial_dermapen_prp" TEXT,
    "instructions" TEXT,
    "laser_q_note" TEXT,
    "prescription" TEXT,
    "provider_notes" TEXT,
    "recommendations" TEXT,
    "slimming_note" TEXT,
    "images" TEXT[],

    CONSTRAINT "PatientAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientTreatment" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "notes" TEXT,
    "treatmentId" INTEGER NOT NULL,
    "patientAssessmentId" INTEGER,
    "billingId" INTEGER,

    CONSTRAINT "PatientTreatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientMedication" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "notes" TEXT,
    "medicineId" INTEGER NOT NULL,
    "patientAssessmentId" INTEGER,
    "billingId" INTEGER,

    CONSTRAINT "PatientMedication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientPackage" (
    "id" SERIAL NOT NULL,
    "packageId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "notes" TEXT,
    "patientAssessmentId" INTEGER,
    "billingId" INTEGER,

    CONSTRAINT "PatientPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientItem" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "notes" TEXT,
    "patientAssessmentId" INTEGER,
    "billingId" INTEGER,

    CONSTRAINT "PatientItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cost" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cost" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" TEXT NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "paymentType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "billingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_userId_key" ON "Employee"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_name_key" ON "Problem"("name");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultations" ADD CONSTRAINT "Consultations_patientAssessmentId_fkey" FOREIGN KEY ("patientAssessmentId") REFERENCES "PatientAssessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultations" ADD CONSTRAINT "Consultations_patientTriageId_fkey" FOREIGN KEY ("patientTriageId") REFERENCES "PatientTriage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultations" ADD CONSTRAINT "Consultations_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "Billings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriageAllergy" ADD CONSTRAINT "TriageAllergy_patientTriageId_fkey" FOREIGN KEY ("patientTriageId") REFERENCES "PatientTriage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriageAllergy" ADD CONSTRAINT "TriageAllergy_allergyId_fkey" FOREIGN KEY ("allergyId") REFERENCES "Allergy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriageProblem" ADD CONSTRAINT "TriageProblem_patientTriageId_fkey" FOREIGN KEY ("patientTriageId") REFERENCES "PatientTriage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriageProblem" ADD CONSTRAINT "TriageProblem_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientTreatment" ADD CONSTRAINT "PatientTreatment_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientTreatment" ADD CONSTRAINT "PatientTreatment_patientAssessmentId_fkey" FOREIGN KEY ("patientAssessmentId") REFERENCES "PatientAssessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientTreatment" ADD CONSTRAINT "PatientTreatment_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "Billings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientMedication" ADD CONSTRAINT "PatientMedication_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientMedication" ADD CONSTRAINT "PatientMedication_patientAssessmentId_fkey" FOREIGN KEY ("patientAssessmentId") REFERENCES "PatientAssessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientMedication" ADD CONSTRAINT "PatientMedication_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "Billings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientPackage" ADD CONSTRAINT "PatientPackage_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientPackage" ADD CONSTRAINT "PatientPackage_patientAssessmentId_fkey" FOREIGN KEY ("patientAssessmentId") REFERENCES "PatientAssessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientPackage" ADD CONSTRAINT "PatientPackage_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "Billings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientItem" ADD CONSTRAINT "PatientItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientItem" ADD CONSTRAINT "PatientItem_patientAssessmentId_fkey" FOREIGN KEY ("patientAssessmentId") REFERENCES "PatientAssessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientItem" ADD CONSTRAINT "PatientItem_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "Billings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billings" ADD CONSTRAINT "Billings_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billings" ADD CONSTRAINT "Billings_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "Billings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
