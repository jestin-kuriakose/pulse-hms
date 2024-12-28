import { Router } from "express";
import authMiddleware from "../middleware/Authenticate.js";
import NotesController from "../controllers/NotesController.js";

const router = Router();

router.use(authMiddleware)

router.get("/patient-triage", NotesController.getPatientTriageNotes);
router.get("/patient-assessment", NotesController.getPatientAssessmentNotes);
router.post("/patient-triage", NotesController.addPatientTriageNote);
router.post("/patient-assessment", NotesController.addPatientAssessmentNote);

export default router;