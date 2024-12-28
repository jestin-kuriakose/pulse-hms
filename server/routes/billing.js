import { Router } from "express";
import authMiddleware from "../middleware/Authenticate.js";
import BillingController from "../controllers/BillingController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", BillingController.getAllBilling);
router.get("/:id", BillingController.getSingleBilling);
router.get("/updateStatus/:id", BillingController.updateBillingStatus);
router.post("/", BillingController.createNewBilling);
router.put("/updateDiscount/:id", BillingController.updateDiscount)
router.post("/generate-pdf", BillingController.generateInvoice);

export default router;
