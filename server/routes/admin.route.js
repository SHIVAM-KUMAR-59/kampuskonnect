import { Router } from "express";
import getAllPendingAlumniController from "../controllers/admin/getAllPendingAlumni.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import handlePendingAlumniController from "../controllers/admin/handlePendingAlumni.controller.js";

const router = Router();

router.use(authMiddleware);
router.use(adminMiddleware);
router.get("/alumni/pending", getAllPendingAlumniController);
router.patch("/alumni/status", handlePendingAlumniController)

export default router;
