import { Router } from "express";
import reqBodyMiddleware from "../middleware/reqBody.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import updateStudentProfileController from "../controllers/user/student/updateProfile.controller.js";
import matchAlumniController from "../controllers/user/student/matchAlumni.controller.js";

const router = Router();

router.use(authMiddleware);
router.put("/profile", reqBodyMiddleware, updateStudentProfileController);
router.get("/match", matchAlumniController);

export default router;
