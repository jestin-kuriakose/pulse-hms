import { Router } from "express";

import authMiddleware from "../middleware/Authenticate.js";
import AvailabilityController from "../controllers/AvailabilityController.js";

const router = Router();

router.get("/", authMiddleware, AvailabilityController.getDoctorAvailability);
router.post("/", authMiddleware, AvailabilityController.createDoctorsAvailability);

export default router;
