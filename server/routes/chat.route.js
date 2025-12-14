import { Router } from "express";
import reqBodyMiddleware from "../middleware/reqBody.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import createChatController from "../controllers/chat/create.controller.js";

const router = Router();

router.use(authMiddleware);
router.post("/create", reqBodyMiddleware, createChatController);

export default router;
