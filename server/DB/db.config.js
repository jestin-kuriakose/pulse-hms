import { PrismaClient } from "@prisma/client";

// Create a new Prisma Client instance and extend it with computed fields
const prisma = new PrismaClient({
  log: ["query", "error"],
})
.$extends({
  result: {
    billings: {
      total: {
        needs: { patientMedications: true },
        compute(billing) {
          // Calculate total based on associated PatientMedications
          const totalMedicinePrice = billing.patientMedications.reduce(
            (sum, medication) => sum + (medication.medicine.price * medication.quantity),
            0
          );
          const totalTreatmentPrice = billing.patientTreatments.reduce(
            (sum, treatment) => sum + (treatment.treatment.price * treatment.quantity),
            0
          );
          const totalPackagePrice = billing.patientPackages.reduce(
            (sum, pack) => sum + (pack.package.price * pack.quantity),
            0
          );
          return totalMedicinePrice + totalTreatmentPrice + totalPackagePrice;
        },
      },
      subtotal: {
        needs: { patientMedications: true },
        compute(billing) {
          const subtotal = billing?.total + billing?.tax - billing?.discount
          return subtotal;
        },
      },
    },
  },
});

export default prisma;