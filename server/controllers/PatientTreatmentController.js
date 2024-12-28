import prisma from "../DB/db.config.js";

class PatientTreatmentController {
  static async createPatientTreatment(req, res) {
    const { quantity, notes, treatmentId, patientAssessmentId, billingId } =
      req.body;
    const currentUserId = req.user.id;
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const currentEmployee = await prisma.employee.findUnique({
          where: {
            userId: currentUserId,
          },
        });
        const patientTreatment = await prisma.patientTreatment.create({
          data: {
            quantity,
            notes,
            treatmentId,
            patientAssessmentId,
            billingId,
            createdById: currentEmployee?.id,
            updatedById: currentEmployee?.id,
          },
          include: {
            treatment: true,
          },
        });
        return patientTreatment;
      });

      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create Patient Treatment" });
    }
  }

  static async getAllPatientTreatments(req, res) {
    try {
      const patientTreatments = await prisma.patientTreatment.findMany();
      res.status(200).json(patientTreatments);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Patient Treatments" });
    }
  }

  static async getSinglePatientTreatment(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ error: "No ID found" });
      }

      const patientTreatment = await prisma.patientTreatment.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(patientTreatment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Patient Treatment" });
    }
  }

  static async updatePatientTreatment(req, res) {
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
        const patientTreatment = await prisma.patientTreatment.update({
          where: {
            id: Number(id),
          },
          data: { ...body, updatedById: currentEmployee?.id },
          include: {
            treatment: true,
          },
        });
        return patientTreatment;
      });

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update Patient Treatment" });
    }
  }

  static async deletePatientTreatment(req, res) {
    const { id } = req.params;

    try {
      const patientTreatment = await prisma.patientTreatment.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(201).json(patientTreatment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create Patient Treatment" });
    }
  }
}

export default PatientTreatmentController;
