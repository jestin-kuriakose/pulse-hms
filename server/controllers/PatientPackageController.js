import prisma from "../DB/db.config.js";

class PatientPackageController {
  static async createPatientPackage(req, res) {
    const { quantity, notes, packageId, patientAssessmentId, billingId } =
      req.body;
      const currentUserId = req.user.id;
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const currentEmployee = await prisma.employee.findUnique({
          where: {
            userId: currentUserId,
          },
        });
        const patientPackage = await prisma.patientPackage.create({
          data: {
            quantity,
            notes,
            packageId,
            patientAssessmentId,
            billingId,
            createdById: currentEmployee?.id,
            updatedById: currentEmployee?.id,
          },
          include: {
            package: true,
          },
        });
        return patientPackage;
      })

      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create Patient Package" });
    }
  }

  static async getAllPatientPackages(req, res) {
    try {
      const patientPackages = await prisma.patientPackage.findMany();
      res.status(200).json(patientPackages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Patient Packages" });
    }
  }

  static async getSinglePatientPackage(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ error: "No ID found" });
      }

      const patientPackage = await prisma.patientPackage.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(patientPackage);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Patient Package" });
    }
  }

  static async updatePatientPackage(req, res) {
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
        const patientPackage = await prisma.patientPackage.update({
          where: {
            id: Number(id),
          },
          data: { ...body, updatedById: currentEmployee?.id },
          include: {
            package: true,
          },
        });
        return patientPackage;
      });

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update Patient Package" });
    }
  }

  static async deletePatientPackage(req, res) {
    const { id } = req.params;

    try {
      const patientPackage = await prisma.patientPackage.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(201).json(patientPackage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create Patient Package" });
    }
  }
}

export default PatientPackageController;
