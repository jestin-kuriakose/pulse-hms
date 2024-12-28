import prisma from "../DB/db.config.js";

class SupplierController {
  static async createSupplier(req, res) {
    const { name, contactName, email, phone, address } = req.body;

    try {
      const supplier = await prisma.supplier.create({
        data: { name, contactName, email, phone, address },
      });
      res.status(201).json(supplier);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create Supplier" });
    }
  }

  static async getAllSuppliers(req, res) {
    try {
      const suppliers = await prisma.supplier.findMany();
      res.status(200).json(suppliers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch Suppliers" });
    }
  }

  static async getSingleSupplier(req, res) {
    const { id } = req.params;

    try {
      const supplier = await prisma.supplier.findUnique({
        where: { id: Number(id) },
        include: {
          medicines: true,
          items: true,
          purchaseOrders: true,
        },
      });
      if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
      }
      res.status(200).json(supplier);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch Supplier" });
    }
  }

  static async updateSupplier(req, res) {
    const { id } = req.params;
    const { name, contactName, email, phone, address } = req.body;

    try {
      const supplier = await prisma.supplier.update({
        where: { id: Number(id) },
        data: { name, contactName, email, phone, address },
      });
      res.status(200).json(supplier);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update Supplier" });
    }
  }

  static async deleteSupplier(req, res) {
    const { id } = req.params;

    try {
      await prisma.supplier.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete Supplier" });
    }
  }
}

export default SupplierController;
