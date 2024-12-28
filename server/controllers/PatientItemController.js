import prisma from "../DB/db.config.js";

class PatientItemController {
  static async createPatientItem(req, res) {
    const { quantity, notes, itemId, patientAssessmentId, billingId } =
      req.body;
    const currentUserId = req.user.id;
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const currentEmployee = await prisma.employee.findUnique({
          where: {
            userId: currentUserId,
          },
        });
        const patientItem = await prisma.patientItem.create({
          data: {
            quantity,
            notes,
            itemId,
            patientAssessmentId,
            billingId,
            createdById: currentEmployee?.id,
            updatedById: currentEmployee?.id,
          },
          include: {
            medicine: true,
          },
        });
        return patientItem;
      });
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create Patient Item" });
    }
  }

  static async getAllPatientItems(req, res) {
    try {
      const patientItems = await prisma.patientItem.findMany();
      res.status(200).json(patientItems);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Patient Items" });
    }
  }

  static async getSinglePatientItem(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ error: "No ID found" });
      }

      const patientItem = await prisma.patientItem.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(patientItem);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Patient Item" });
    }
  }

  static async updatePatientItem(req, res) {
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
        const patientItem = await prisma.patientItem.update({
          where: {
            id: Number(id),
          },
          data: {
            ...body,
            updatedById: currentEmployee?.id,
          },
          include: {
            medicine: true,
          }
        });
        return patientItem;
      });

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update Patient Item" });
    }
  }

  static async deletePatientItem(req, res) {
    const { id } = req.params;

    try {
      const patientItem = await prisma.patientItem.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(201).json(patientItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create Patient Item" });
    }
  }
}

export default PatientItemController;
