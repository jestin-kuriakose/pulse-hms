import prisma from "../DB/db.config.js";

class PackageController {
  static async createPackage(req, res) {
    const body = req.body;
    const currentUserId = req.user.id;

    try {
      const result = await prisma.$transaction(async (prisma) => {
        const currentEmployee = await prisma.employee.findUnique({
          where: {
            userId: currentUserId,
          },
        });
        const medicalPackage = await prisma.package.create({
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
        return medicalPackage;
      })

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create Package" });
    }
  }

  static async getAllPackages(req, res) {
    const { search } = req?.query;
    const searchQuery = search || "";
    
    try {
      const medicalPackages = await prisma.package.findMany({
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
      res.status(200).json(medicalPackages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Packages" });
    }
  }

  static async getSinglePackage(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ error: "No ID found" });
      }

      const medicalPackage = await prisma.package.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          category: true,
        },
      });
      res.status(200).json(medicalPackage);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Package" });
    }
  }

  static async updatePackage(req, res) {
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
        const medicalPackage = await prisma.package.update({
          where: {
            id: Number(id),
          },
          data: { ...body, updatedById: currentEmployee?.id },
          include: {
            category: true,
          },
        });
        return medicalPackage;
      });

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update Package" });
    }
  }

  static async deletePackage(req, res) {
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
        });
        const medicalPackage = await prisma.package.delete({
          where: {
            id: Number(id),
          },
        }); 
        return medicalPackage;
      })
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to delete Package" });
    }
  }
}

export default PackageController;
