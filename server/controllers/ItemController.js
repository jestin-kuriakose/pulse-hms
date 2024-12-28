import prisma from "../DB/db.config.js";

class ItemController {
  static async createItem(req, res) {
    const body = req.body;

    try {
      const item = await prisma.Item.create({
        data: {
          ...body,
          reorderPoint: parseInt(body.reorderPoint),
          categoryId: parseInt(body.categoryId),
          supplierId: parseInt(body.supplierId),
        },
        include: {
          category: true,
          supplier: true,
        },
      });
      res.status(200).json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create Item" });
    }
  }

  static async getAllItems(req, res) {
    const { search } = req?.query;
    const searchQuery = search || "";

    try {
      const items = await prisma.Item.findMany({
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
      res.status(200).json(items);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Items" });
    }
  }

  static async getSingleItem(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ error: "No ID found" });
      }

      const item = await prisma.Item.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          category: true,
          supplier: true,
        },
      });
      res.status(200).json(item);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Item" });
    }
  }

  static async updateItem(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;

      if (!id || !body) {
        return res.status(404).json({ error: "No ID or body found" });
      }

      const item = await prisma.Item.update({
        where: {
          id: Number(id),
        },
        data: {
          ...body,
          reorderPoint: parseInt(body.reorderPoint),
          categoryId: parseInt(body.categoryId),
          supplierId: parseInt(body.supplierId),
        },
        include: {
          category: true,
          supplier: true,
        },
      });
      res.status(200).json(item);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update Item" });
    }
  }

  static async deleteItem(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ error: "No ID found" });
      }

      const item = await prisma.Item.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(item);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to delete Item" });
    }
  }
}

export default ItemController;
