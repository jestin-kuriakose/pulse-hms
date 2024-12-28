import { Router } from "express";

import authMiddleware from "../middleware/Authenticate.js";
import PatientController from "../controllers/PatientController.js";

const router = Router();

// Apply authMiddleware to all routes
router.use(authMiddleware);

router.get("/", PatientController.getPatients);
router.get("/:id", PatientController.getSinglePatient);
router.post("/", PatientController.addPatient);

export default router;
