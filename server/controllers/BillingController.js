import prisma from "../DB/db.config.js";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";
import AuditLogService from "../services/AuditLogService.js";
import vine, { errors } from "@vinejs/vine";
import { getBillingData } from "../services/BillingService.js";
import { generateInvoicePDF } from "../services/PDFService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const billingTemplatePath = path.join(
  __dirname, "pdf", "templates",
  "billing_template.hbs"
);
console.log(billingTemplatePath);
class BillingController {
  // Centralized error handling
  static handleError(error, res) {
    console.error("Error:", error);
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).json({ status: "400", message: error.messages });
    }
    return res.status(500).json({
      status: "500",
      message: "Something went wrong. Please try again.",
    });
  }

  // Fetch all billings
  static async getAllBilling(req, res) {
    const { startDate, endDate, search } = req?.query;
    const sDate = new Date(startDate);
    sDate.setHours(0, 0, 0);
    const eDate = new Date(endDate);
    eDate.setHours(23, 59, 59);

    try {
      const where = {};

      if (startDate && endDate) {
        where.createdAt = {
          gte: sDate.toISOString(),
          lte: eDate.toISOString(),
        };
      }

      if (search) {
        where.OR = [
          { patient: { firstName: { contains: search, mode: "insensitive" } } },
          { patient: { lastName: { contains: search, mode: "insensitive" } } },
          { patient: { email: { contains: search, mode: "insensitive" } } },
          {
            patient: { phoneNumber: { contains: search, mode: "insensitive" } },
          },
        ];
      }

      const billings = await prisma.billings.findMany({
        where,
        include: {
          patient: true,
          doctor: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                  role: true,
                },
              },
            },
          },
          patientMedications: { include: { medicine: true } },
          patientTreatments: { include: { treatment: true } },
          patientPackages: { include: { package: true } },
          payments: true,
        },
      });

      res.json(billings);
    } catch (error) {
      BillingController.handleError(error, res);
    }
  }

  static async getSingleBilling(req, res) {
    const { id } = req.params;

    try {
      // Fetch all billings with optional date range filter
      const billing = await prisma.billings.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          patient: true, // Fetch related patient data
          doctor: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                  role: true,
                },
              },
            },
          }, // Fetch related doctor data
          patientMedications: {
            include: {
              medicine: true,
            },
          },
          patientTreatments: {
            include: {
              treatment: true,
            },
          },
          patientPackages: {
            include: {
              package: true,
            },
          },
          payments: true,
        },
      });

      res.json(billing);
    } catch (error) {
      BillingController.handleError(error, res);
    }
  }

  // Create a new billing
  static async createNewBilling(req, res) {
    const body = req.body;
    const currentUserId = req.user.id;

    try {
      if (!body) throw new Error("No body found.");

      const foundConsultation = await prisma.consultations.findUnique({
        where: { id: Number(body?.consultationId) },
      });
      if (!foundConsultation) throw new Error("Invalid consultation ID.");
      console.log(foundConsultation);
      const billing = await prisma.$transaction(async (prisma) => {
        const currentEmployee = await prisma.employee.findUnique({
          where: { userId: currentUserId },
        });

        const newBill = await prisma.billings.create({
          data: {
            consultationId: Number(body?.consultationId),
            patientId: Number(foundConsultation.patientId),
            doctorId: Number(foundConsultation.doctorId),
            total: 0,
            subtotal: 0,
            tax: 0,
            discount: 0,
            previousBalance: 0,
            paymentMade: "pending",
            createdById: currentEmployee?.id,
            updatedById: currentEmployee?.id,
          },
        });

        await AuditLogService.logAction(
          newBill.id,
          req.user.id,
          "CREATE",
          { newValues: newBill },
          { entityType: "billing" }
        );

        return newBill;
      });

      res.status(200).json(billing);
    } catch (error) {
      BillingController.handleError(error, res);
    }
  }

  // Update billing status
  static async updateBillingStatus(req, res) {
    const { id } = req?.params;
    const currentUserId = req?.user?.id;
    try {
      const currentEmployee = await prisma.employee.findUnique({
        where: { userId: currentUserId },
      });
      const billing = await prisma.billings.findUnique({
        where: { id: Number(id) },
        include: {
          payments: true,
          patientMedications: { include: { medicine: true } },
          patientTreatments: { include: { treatment: true } },
          patientPackages: { include: { package: true } },
        },
      });

      const totalPaymentAmount = billing?.payments?.reduce(
        (sum, payment) => payment?.amount + sum,
        0
      );
      const totalMedicinePrice = billing.patientMedications.reduce(
        (sum, medication) =>
          sum + medication.medicine.price * medication.quantity,
        0
      );
      const totalTreatmentPrice = billing.patientTreatments.reduce(
        (sum, treatment) =>
          sum + treatment.treatment.price * treatment.quantity,
        0
      );
      const totalPackagePrice = billing.patientPackages.reduce(
        (sum, pack) => sum + pack.package.price * pack.quantity,
        0
      );

      const billingSubtotal =
        totalMedicinePrice +
        totalTreatmentPrice +
        totalPackagePrice +
        billing?.tax;

      let status;
      if (totalPaymentAmount === 0) status = "Pending";
      else if (totalPaymentAmount < billingSubtotal) status = "Partially-Paid";
      else status = "Paid";

      const updatedBilling = await prisma.billings.update({
        where: { id: Number(id) },
        data: { status, updatedById: currentEmployee?.id },
      });

      await AuditLogService.logAction(
        updatedBilling.id,
        req.user.id,
        "UPDATE_BILLING_STATUS",
        { newValues: updatedBilling },
        { entityType: "billing" }
      );

      res.status(200).json(updatedBilling);
    } catch (error) {
      BillingController.handleError(error, res);
    }
  }

  // Update discount
  static async updateDiscount(req, res) {
    const { id } = req?.params;
    const { discount } = req?.body;
    const currentUserId = req?.user?.id;
    try {
      if (!id || !discount) throw new Error("Invalid input.");

      const currentEmployee = await prisma.employee.findUnique({
        where: { userId: currentUserId },
      });

      const updatedBilling = await prisma.billings.update({
        where: { id: Number(id) },
        data: { discount, updatedById: currentEmployee?.id },
      });

      await AuditLogService.logAction(
        updatedBilling.id,
        req.user.id,
        "UPDATE_DISCOUNT",
        { newValues: updatedBilling },
        { entityType: "billing" }
      );

      res.status(200).json(updatedBilling);
    } catch (error) {
      BillingController.handleError(error, res);
    }
  }

  static async generateInvoice(req, res) {
    try {
      const { billingId } = req.body;
      const billingData = await getBillingData(billingId);

      const { pdf, pdfPath } = await generateInvoicePDF(billingData, billingTemplatePath);

      await AuditLogService.logAction(
        billingData.id,
        req.user.id,
        "GENERATE_INVOICE",
        {},
        { entityType: "billing" }
      );

      const pdfFileName = `Invoice-${billingData.id}.pdf`;

      res.sendFile(pdfPath, pdfFileName, (err) => {
        if (err) {
          console.error("Error sending file:", err);
          res.status(500).send("Error sending PDF");
        }

        // Optionally delete the file after sending it
        fs.unlink(pdfPath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting temp file:", unlinkErr);
          }
        });
      });
    } catch (error) {
      console.error("Error generating invoice:", error);
      res.status(500).json({ error: "Failed to generate invoice" });
    }
  }

}

export default BillingController;
