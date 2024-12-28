import { Router } from "express";
import SupplierController from "../controllers/SupplierController.js";
import authMiddleware from "../middleware/Authenticate.js";

const router = Router()

router.use(authMiddleware)

router.get("/", SupplierController.getAllSuppliers);
router.get("/:id", SupplierController.getSingleSupplier);
router.post("/", SupplierController.createSupplier)
router.put("/:id", SupplierController.updateSupplier)
router.delete("/:id", SupplierController.deleteSupplier)

export default router