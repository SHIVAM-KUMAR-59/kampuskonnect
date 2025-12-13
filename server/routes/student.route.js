import { Router } from "express";
import reqBodyMiddleware from "../middleware/reqBody.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import updateStudentProfileController from "../controllers/user/student/updateProfile.controller.js";
import matchAlumniController from "../controllers/user/student/matchAlumni.controller.js";
import sendConnectionRequestController from "../controllers/user/student/sendConnectionRequest.controller.js";
import studentMiddleware from "../middleware/student.middleware.js";
import getAllConnectionsController from "../controllers/user/student/getAllConnections.controller.js";

const router = Router();

router.use(authMiddleware);
router.use(studentMiddleware);
router.put("/profile", reqBodyMiddleware, updateStudentProfileController);
router.get("/match", matchAlumniController);
router.post("/connect/:id", sendConnectionRequestController);
router.get("/connections", getAllConnectionsController);

export default router;
