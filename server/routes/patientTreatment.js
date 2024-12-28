import { Router } from "express";

import authMiddleware from "../middleware/Authenticate.js";
import PatientTreatmentController from "../controllers/PatientTreatmentController.js";

const router = Router();

router.get("/", PatientTreatmentController.getAllPatientTreatments);
router.get("/:id", PatientTreatmentController.getSinglePatientTreatment);
router.post("/", PatientTreatmentController.createPatientTreatment)
router.put("/:id", PatientTreatmentController.updatePatientTreatment)
router.delete("/:id", PatientTreatmentController.deletePatientTreatment)

export default router;