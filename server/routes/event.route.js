import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import reqBodyMiddleware from "../middleware/reqBody.middleware.js";
import createEventController from "../controllers/event/create.controller.js";
import fetchAllEventsController from "../controllers/event/fetchAll.controller.js";

const router = Router();

router.use(authMiddleware);
router.use(adminMiddleware);
router.post("/", reqBodyMiddleware, createEventController);
router.get("/", fetchAllEventsController);

export default router;
