-- CreateTable
CREATE TABLE "Availability" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Triage" (
    "id" SERIAL NOT NULL,
    "appointmentId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "immunizationUpToDate" TEXT NOT NULL,
    "immunizationRemarks" TEXT NOT NULL,
    "allergenHistory" TEXT NOT NULL,
    "systolic" TEXT NOT NULL,
    "diastolic" TEXT NOT NULL,
    "temperature" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "spO2" TEXT NOT NULL,
    "bmi" TEXT NOT NULL,
    "pulse" TEXT NOT NULL,
    "painScale" TEXT NOT NULL,
    "pastMedicalHistory" TEXT NOT NULL,
    "familyHistory" TEXT NOT NULL,
    "socialHistory" TEXT NOT NULL,
    "surgicalHistory" TEXT NOT NULL,
    "creams" TEXT NOT NULL,
    "nurseAssessment" TEXT NOT NULL,
    "medications" TEXT NOT NULL,
    "otherNotes" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Triage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allergy" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "allergy" TEXT NOT NULL,
    "reaction" TEXT NOT NULL,
    "st" TEXT NOT NULL,
    "se" TEXT NOT NULL,
    "triageId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Allergy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TriageProblem" (
    "id" SERIAL NOT NULL,
    "triageId" INTEGER NOT NULL,
    "problemId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TriageProblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProblemToTriage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Problem_name_key" ON "Problem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProblemToTriage_AB_unique" ON "_ProblemToTriage"("A", "B");

-- CreateIndex
CREATE INDEX "_ProblemToTriage_B_index" ON "_ProblemToTriage"("B");

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Triage" ADD CONSTRAINT "Triage_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allergy" ADD CONSTRAINT "Allergy_triageId_fkey" FOREIGN KEY ("triageId") REFERENCES "Triage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriageProblem" ADD CONSTRAINT "TriageProblem_triageId_fkey" FOREIGN KEY ("triageId") REFERENCES "Triage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriageProblem" ADD CONSTRAINT "TriageProblem_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemToTriage" ADD CONSTRAINT "_ProblemToTriage_A_fkey" FOREIGN KEY ("A") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemToTriage" ADD CONSTRAINT "_ProblemToTriage_B_fkey" FOREIGN KEY ("B") REFERENCES "Triage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
