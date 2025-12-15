import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import reqBodyMiddleware from "../middleware/reqBody.middleware.js";
import createEventController from "../controllers/event/create.controller.js";
import fetchAllEventsController from "../controllers/event/fetchAll.controller.js";
import fetchEventByIdController from "../controllers/event/fetchById.controller.js";
import deleteEventController from "../controllers/event/delete.controller.js";
import editEventController from "../controllers/event/edit.controller.js";

const router = Router();

router.use(authMiddleware);
router.get("/:id", fetchEventByIdController);
router.get("/", fetchAllEventsController);

router.use(adminMiddleware);
router.post("/", reqBodyMiddleware, createEventController);
router.put("/:id", reqBodyMiddleware, editEventController);
router.delete("/:id", deleteEventController);

export default router;
