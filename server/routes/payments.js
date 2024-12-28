import { Router } from "express";

import authMiddleware from "../middleware/Authenticate.js";
import PaymentController from "../controllers/PaymentController.js";

const router = Router();

router.use(authMiddleware);

router.post("/", PaymentController.createNewPayment);
router.put("/:id", PaymentController.updatePayment);
router.delete("/:id", PaymentController.deletePayment);

export default router