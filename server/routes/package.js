import { Router } from "express";

import authMiddleware from "../middleware/Authenticate.js";
import PackageController from "../controllers/PackageController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", PackageController.getAllPackages);
router.get("/:id", PackageController.getSinglePackage);
router.post("/", PackageController.createPackage)
router.put("/:id", PackageController.updatePackage)
router.delete("/:id", PackageController.deletePackage)

export default router;