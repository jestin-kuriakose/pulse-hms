import { Router } from "express";

import authMiddleware from "../middleware/Authenticate.js";
import AppointmentController from "../controllers/AppointmentContoller.js";

const router = Router();

router.use(authMiddleware);

router.get("/", AppointmentController.getAppointments);
router.get("/patient/:id", AppointmentController.getAppointmentsByPatient);
router.post("/", AppointmentController.createAppointment);
router.put("/:id", AppointmentController.updateAppointment);
router.delete("/:id", AppointmentController.deleteAppointment);

export default router;
