import { Router } from "express";

import authMiddleware from "../middleware/Authenticate.js";
import PatientMedicationController from "../controllers/PatientMedicationController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", PatientMedicationController.getAllPatientMedications);
router.get("/:id", PatientMedicationController.getSinglePatientMedication);
router.post("/", PatientMedicationController.createPatientMedication)
router.put("/:id", PatientMedicationController.updatePatientMedication)
router.delete("/:id", PatientMedicationController.deletePatientMedication)

export default router;