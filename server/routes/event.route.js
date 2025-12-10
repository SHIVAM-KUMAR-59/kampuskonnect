import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import reqBodyMiddleware from "../middleware/reqBody.middleware.js";
import createEventController from "../controllers/event/create.controller.js";

const router = Router();

router.use(authMiddleware);
router.use(adminMiddleware);
router.post("/", reqBodyMiddleware, createEventController);

export default router;
