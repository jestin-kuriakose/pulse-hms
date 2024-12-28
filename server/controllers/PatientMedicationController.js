import prisma from "../DB/db.config.js";

class PatientMedicationController {
  static async createPatientMedication(req, res) {
    const { quantity, notes, medicineId, patientAssessmentId, billingId } =
      req.body;
    const currentUserId = req.user.id;

    try {
      const result = await prisma.$transaction(async (prisma) => {
        const currentEmployee = await prisma.employee.findUnique({
          where: {
            userId: currentUserId,
          },
        });

        const patientMedication = await prisma.patientMedication.create({
          data: {
            quantity,
            notes,
            medicineId,
            patientAssessmentId,
            billingId,
            createdById: currentEmployee?.id,
            updatedById: currentEmployee?.id,
          },
          include: {
            medicine: true,
          },
        });

        return patientMedication;
      });

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create Patient Medication" });
    }
  }

  static async getAllPatientMedications(req, res) {
    try {
      const patientMedications = await prisma.patientMedication.findMany();
      res.status(200).json(patientMedications);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Patient Medications" });
    }
  }

  static async getSinglePatientMedication(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ error: "No ID found" });
      }

      const patientMedication = await prisma.patientMedication.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(patientMedication);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Patient Medication" });
    }
  }

  static async updatePatientMedication(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;

      const currentUserId = req.user.id;

      if (!id || !body) {
        return res.status(404).json({ error: "No ID or body found" });
      }

      const result = await prisma.$transaction(async (prisma) => {
        const currentEmployee = await prisma.employee.findUnique({
          where: {
            userId: currentUserId,
          },
        });

        const patientMedication = await prisma.patientMedication.update({
          where: {
            id: Number(id),
          },
          data: { ...body, updatedById: currentEmployee?.id },
          include: {
            medicine: true,
          }
        });

        return patientMedication;
      });

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update Patient Medication" });
    }
  }

  static async deletePatientMedication(req, res) {
    const { id } = req.params;

    try {
      const patientMedication = await prisma.patientMedication.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(201).json(patientMedication);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create Patient Medication" });
    }
  }
}

export default PatientMedicationController;
