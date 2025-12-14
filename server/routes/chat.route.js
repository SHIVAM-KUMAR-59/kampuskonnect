import { Router } from "express";
import reqBodyMiddleware from "../middleware/reqBody.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import createChatController from "../controllers/chat/create.controller.js";
import fetchAllChatsController from "../controllers/chat/fetch.controller.js";

const router = Router();

router.use(authMiddleware);
router.get("/", fetchAllChatsController);
router.post("/", reqBodyMiddleware, createChatController);

export default router;
