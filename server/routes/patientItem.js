import { Router } from "express";

import authMiddleware from "../middleware/Authenticate.js";
import PatientItemController from "../controllers/PatientItemController.js";

const router = Router();

router.get("/", PatientItemController.getAllPatientItems);
router.get("/:id", PatientItemController.getSinglePatientItem);
router.post("/", PatientItemController.createPatientItem)
router.put("/:id", PatientItemController.updatePatientItem)
router.delete("/:id", PatientItemController.deletePatientItem)

export default router;