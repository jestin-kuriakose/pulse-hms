import { Router } from "express";

import authMiddleware from "../middleware/Authenticate.js";
import DoctorController from "../controllers/DoctorController.js";

const router = Router();

router.get("/", authMiddleware, DoctorController.getDoctors);
router.get("/:id", authMiddleware, DoctorController.getSingleDoctor);
router.post("/", authMiddleware, DoctorController.addDoctor);
router.put("/:id", authMiddleware, DoctorController.updateDoctor);

export default router;
