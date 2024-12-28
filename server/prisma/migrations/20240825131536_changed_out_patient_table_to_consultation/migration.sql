/*
  Warnings:

  - You are about to drop the `OutPatients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "OutPatients";

-- CreateTable
CREATE TABLE "Consultations" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" VARCHAR(191) NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "nationalID" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Consultations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Consultations_email_key" ON "Consultations"("email");
