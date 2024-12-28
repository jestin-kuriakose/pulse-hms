import prisma from "../DB/db.config.js";

class CategoryController {
  static async createCategory(req, res) {
    const { name, description } = req.body;

    try {
      const category = await prisma.category.create({
        data: { name, description },
      });
      res.status(201).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create Category" });
    }
  }

  static async getAllCategories(req, res) {
    try {
      const categories = await prisma.category.findMany();
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch Categories" });
    }
  }

  static async getSingleCategory(req, res) {
    const { id } = req.params;

    try {
      const category = await prisma.category.findUnique({
        where: { id: Number(id) },
        include: {
          medicines: true,
          items: true,
          treatments: true,
          packages: true,
        },
      });
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch Category" });
    }
  }

  static async updateCategory(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const category = await prisma.category.update({
        where: { id: Number(id) },
        data: { name, description },
      });
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update Category" });
    }
  }

  static async deleteCategory(req, res) {
    const { id } = req.params;

    try {
      await prisma.category.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete Category" });
    }
  }
}

export default CategoryController;
