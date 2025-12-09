import { Router } from "express";
import reqBodyMiddleware from "../middleware/reqBody.middleware.js";
import createPasswordController from "../controllers/user/createPassword.controller.js";
import updatePasswordController from "../controllers/user/updatePassword.controller.js";

const router = Router();

router.post("/password/create", reqBodyMiddleware, createPasswordController);
router.patch("/password/update", reqBodyMiddleware, updatePasswordController)

export default router;
