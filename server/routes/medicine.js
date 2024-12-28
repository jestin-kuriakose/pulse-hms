import { Router } from "express";

import authMiddleware from "../middleware/Authenticate.js";
import MedicineController from "../controllers/MedicineController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", MedicineController.getAllMedicines);
router.get("/:id", MedicineController.getSingleMedicine);
router.post("/", MedicineController.createMedicine)
router.put("/:id", MedicineController.updateMedicine)
router.delete("/:id", MedicineController.deleteMedicine)

export default router;