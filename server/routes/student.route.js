import { Router } from "express";
import reqBodyMiddleware from "../middleware/reqBody.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import updateStudentProfileController from "../controllers/user/student/updateProfile.controller.js";

const router = Router();

router.use(authMiddleware);
router.put("/profile", reqBodyMiddleware, updateStudentProfileController);

export default router;
