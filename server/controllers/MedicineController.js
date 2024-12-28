import prisma from "../DB/db.config.js";

class MedicineController {
  static async createMedicine(req, res) {
    const body = req.body;
    const currentUserId = req.user.id;
console.log(body)
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const currentEmployee = await prisma.employee.findUnique({
          where: {
            userId: currentUserId,
          },
        })
        const medicine = await prisma.medicine.create({
          data: {
            ...body,
            expirationDate: body.expirationDate ? new Date(body.expirationDate) : null,
            createdById: currentEmployee?.id,
            updatedById: currentEmployee?.id,
          },
          include: {
            category: true,
            supplier: true,
          },
        });
        return medicine;
      })

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create Medicine" });
    }
  }

  static async getAllMedicines(req, res) {
    const { search } = req?.query;
    const searchQuery = search || "";

    try {
      const medicines = await prisma.medicine.findMany({
        where: {
          OR: [
            { code: { contains: searchQuery, mode: "insensitive" } },
            { name: { contains: searchQuery, mode: "insensitive" } },
          ],
        },
        include: {
          category: true,
          supplier: true,
        },
      });
      res.status(200).json(medicines);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Medicines" });
    }
  }

  static async getSingleMedicine(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ error: "No ID found" });
      }

      const medicine = await prisma.medicine.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          category: true,
          supplier: true,
        },
      });
      res.status(200).json(medicine);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Medicine" });
    }
  }

  static async updateMedicine(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;

      if (!id || !body) {
        return res.status(404).json({ error: "No ID or body found" });
      }

      const medicine = await prisma.medicine.update({
        where: {
          id: Number(id),
        },
        data: {
          ...body,
          reorderPoint: parseInt(body.reorderPoint),
          categoryId: parseInt(body.categoryId),
          supplierId: parseInt(body.supplierId),
          expirationDate: body.expirationDate ? new Date(body.expirationDate) : null,
        },
        include: {
          category: true,
          supplier: true,
        },
      });
      res.status(200).json(medicine);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update Medicine" });
    }
  }

  static async deleteMedicine(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ error: "No ID found" });
      }

      const medicine = await prisma.medicine.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(medicine);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to delete Medicine" });
    }
  }
}

export default MedicineController;
