import { Router } from "express";
import CategoryController from "../controllers/CategoryController.js";
import authMiddleware from "../middleware/Authenticate.js";

const router = Router()

router.use(authMiddleware)

router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getSingleCategory);
router.post("/", CategoryController.createCategory)
router.put("/:id", CategoryController.updateCategory)
router.delete("/:id", CategoryController.deleteCategory)

export default router