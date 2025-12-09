import { Router } from "express";
import studentRegisterController from "../controllers/auth/studentRegister.controller.js";
import reqBodyMiddleware from "../middleware/reqBody.middleware.js";
import alumniRegisterController from "../controllers/auth/alumniRegister.controller.js";
import userCredentialsLoginController from "../controllers/auth/userCredentialsLogin.controller.js";
import userGoogleLoginController from "../controllers/auth/userGoogleLogin.controller.js";

const router = Router();

router.post("/student/register", reqBodyMiddleware, studentRegisterController);
router.post("/alumni/register", reqBodyMiddleware, alumniRegisterController);
router.post("/user/credentials/login", reqBodyMiddleware, userCredentialsLoginController);
router.post("/user/google/login", reqBodyMiddleware, userGoogleLoginController);

export default router;
