-- CreateTable
CREATE TABLE "PatientConsultations" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "visitType" TEXT NOT NULL,
    "consultationType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "remarks" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PatientConsultations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PatientConsultations" ADD CONSTRAINT "PatientConsultations_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientConsultations" ADD CONSTRAINT "PatientConsultations_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
