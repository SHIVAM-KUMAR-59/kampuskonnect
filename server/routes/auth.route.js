import { Router } from "express";
import studentRegisterController from "../controllers/auth/studentRegister.controller.js";
import reqBodyMiddleware from "../middleware/reqBody.middleware.js";
import alumniRegisterController from "../controllers/auth/alumniRegister.controller.js";

const router = Router();

router.post("/student/register", reqBodyMiddleware, studentRegisterController);
router.post("/alumni/register", reqBodyMiddleware, alumniRegisterController);

export default router;
