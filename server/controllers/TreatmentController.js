import prisma from "../DB/db.config.js";

class TreatmentController {
  static async createTreatment(req, res) {
    const body = req.body;
    const currentUserId = req.user.id;

    try {
      const result = await prisma.$transaction(async (prisma) => {
        const currentEmployee = await prisma.employee.findUnique({
          where: {
            userId: currentUserId,
          },
          include: {
            treatments: true,
          },
        });
        return await prisma.treatment.create({
          data: {
            ...body,
            categoryId: parseInt(body.categoryId),
            createdById: currentEmployee?.id,
            updatedById: currentEmployee?.id,
          },
          include: {
            category: true,
          },
        });
      });

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create treatment" });
    }
  }

  static async getAllTreatments(req, res) {
    const { search } = req?.query;
    const searchQuery = search || "";

    try {
      const treatments = await prisma.treatment.findMany({
        where: {
          OR: [
            { code: { contains: searchQuery, mode: "insensitive" } },
            { name: { contains: searchQuery, mode: "insensitive" } },
          ],
        },
        include: {
          category: true,
        },
      });
      res.status(200).json(treatments);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch treatments" });
    }
  }

  static async getSingleTreatment(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ error: "No ID found" });
      }

      const treatment = await prisma.treatment.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          category: true,
        },
      });
      res.status(200).json(treatment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch treatment" });
    }
  }

  static async updateTreatment(req, res) {
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
          include: {
            treatments: true,
          },
        });
        return await prisma.treatment.update({
          where: {
            id: Number(id),
          },
          data: {
            ...body,
            categoryId: parseInt(body.categoryId),
            updatedById: currentEmployee?.id,
          },
          include: {
            category: true,
          },
        });
      });

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update treatment" });
    }
  }

  static async deleteTreatment(req, res) {
    try {
      const { id } = req.params;

      const currentUserId = req.user.id;

      if (!id) {
        return res.status(404).json({ error: "No ID found" });
      }

      const result = await prisma.$transaction(async (prisma) => {
        const currentEmployee = await prisma.employee.findUnique({
          where: {
            userId: currentUserId,
          },
          include: {
            treatments: true,
          },
        });
        return await prisma.treatment.update({
          where: {
            id: Number(id),
          },
        });
      });

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to delete treatment" });
    }
  }
}

export default TreatmentController;
