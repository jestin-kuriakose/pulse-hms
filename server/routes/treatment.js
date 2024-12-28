import { Router } from "express";

import authMiddleware from "../middleware/Authenticate.js";
import TreatmentController from "../controllers/TreatmentController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", TreatmentController.getAllTreatments);
router.get("/:id", TreatmentController.getSingleTreatment);
router.post("/", TreatmentController.createTreatment)
router.put("/:id", TreatmentController.updateTreatment)
router.delete("/:id", TreatmentController.deleteTreatment)

export default router;