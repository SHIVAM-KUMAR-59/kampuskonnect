import { Router } from "express";
import reqBodyMiddleware from "../middleware/reqBody.middleware.js";
import createPasswordController from "../controllers/user/createPassword.controller.js";
import updatePasswordController from "../controllers/user/updatePassword.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import deleteUserController from "../controllers/user/deleteUser.controller.js";
import getCurrentUserController from "../controllers/user/getCurrentUser.controller.js";

const router = Router();

router.use(authMiddleware);
router.get("/:id", getCurrentUserController);
router.post("/password/create", reqBodyMiddleware, createPasswordController);
router.patch("/password/update", reqBodyMiddleware, updatePasswordController);
router.delete("/:id", deleteUserController);

export default router;
