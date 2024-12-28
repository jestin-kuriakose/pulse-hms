import prisma from "../DB/db.config.js";

export async function getBillingData(patientId) {
  const billing = await prisma.billings.findUnique({
    where: { id: Number(patientId) },
    include: {
      patient: true,
      doctor: true,
      payments: true,
      patientMedications: { include: { medicine: true } },
      patientTreatments: { include: { treatment: true } },
      patientPackages: { include: { package: true } },
    },
  });

  if (!billing) {
    throw new Error('Billing not found');
  }

  return {
    ...billing,
    subtotal: billing.subtotal || 0,
    discount: billing.discount || 0,
    taxRate: billing.tax || 0,
    taxAmount: (billing.subtotal || 0) * ((billing.tax || 0) / 100),
    total: (billing.subtotal || 0) - (billing.discount || 0) + ((billing.subtotal || 0) * ((billing.tax || 0) / 100)),
  };
}