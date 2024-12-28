import { Router } from "express";

import authMiddleware from "../middleware/Authenticate.js";
import ItemController from "../controllers/ItemController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", ItemController.getAllItems);
router.get("/:id", ItemController.getSingleItem);
router.post("/", ItemController.createItem)
router.put("/:id", ItemController.updateItem)
router.delete("/:id", ItemController.deleteItem)

export default router;