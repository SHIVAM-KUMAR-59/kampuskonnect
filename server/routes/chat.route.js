import { Router } from "express";
import reqBodyMiddleware from "../middleware/reqBody.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import createChatController from "../controllers/chat/create.controller.js";
import fetchAllChatsController from "../controllers/chat/fetch.controller.js";
import fetchChatByIdController from "../controllers/chat/fetchOne.controller.js";
import sendMessageController from "../controllers/chat/sendMessage.controller.js";
import updateMessageController from "../controllers/chat/updateMessage.controller.js";

const router = Router();

router.use(authMiddleware);
router.get("/", fetchAllChatsController);
router.get("/:id", fetchChatByIdController);
router.post("/", reqBodyMiddleware, createChatController);

router.post("/message", reqBodyMiddleware, sendMessageController);
router.patch("/message", reqBodyMiddleware, updateMessageController);

export default router;
