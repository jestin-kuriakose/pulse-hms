import { Router } from "express";

import authMiddleware from "../middleware/Authenticate.js";

import ConsultationsController from "../controllers/ConsultationController.js";

const router = Router();

router.use(authMiddleware);

router
  .get("/", ConsultationsController.getConsultations)

  .get("/:id", ConsultationsController.getSingleConsultation)

  // Get all consultations of a patient
  .get("/patient/:id", ConsultationsController.getPatientConsultations)

  // Add new consultation
  .post("/", ConsultationsController.addNewConsultation)

  // Update patientAssessment
  .put(
    "/patientAssessment/:id",
    ConsultationsController.updatePatientAssessment
  )

  // Update patientTriage
  .put("/patientTriage/:id", ConsultationsController.updatePatientTriage);

export default router;
