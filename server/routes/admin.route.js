import { Router } from "express";
import getAllPendingAlumniController from "../controllers/admin/getAllPendingAlumni.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = Router();

router.use(authMiddleware)
router.use(adminMiddleware)
router.get("/alumni/pending", getAllPendingAlumniController);

export default router;
