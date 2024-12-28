-- CreateTable
CREATE TABLE "Patients" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "email" VARCHAR(191) NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "emirate" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "visaType" TEXT NOT NULL,
    "nationalID" TEXT NOT NULL,
    "otherID" TEXT NOT NULL,
    "emergencyContactNumber" TEXT NOT NULL,
    "emergencyContactName" TEXT NOT NULL,
    "emergencyContactRelationship" TEXT NOT NULL,
    "allergies" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patients_id_key" ON "Patients"("id");
