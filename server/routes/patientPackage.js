import { Router } from "express";

import authMiddleware from "../middleware/Authenticate.js";
import PatientPackageController from "../controllers/PatientPackageController.js";

const router = Router();

router.get("/", PatientPackageController.getAllPatientPackages);
router.get("/:id", PatientPackageController.getSinglePatientPackage);
router.post("/", PatientPackageController.createPatientPackage)
router.put("/:id", PatientPackageController.updatePatientPackage)
router.delete("/:id", PatientPackageController.deletePatientPackage)

export default router;