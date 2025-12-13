import { Router } from "express";
import reqBodyMiddleware from "../middleware/reqBody.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import updateAlumniProfileController from "../controllers/user/alumni/updateProfile.controller.js";

const router = Router();

router.use(authMiddleware);
router.put("/profile", reqBodyMiddleware, updateAlumniProfileController);

export default router;
