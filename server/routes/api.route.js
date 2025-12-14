import { Router } from "express";
import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import adminRoutes from "./admin.route.js";
import eventRoutes from "./event.route.js";
import studentRoutes from "./student.route.js";
import alumniRoutes from "./alumni.route.js";
import chatRoutes from "./chat.route.js";
import errorHandlerMiddleware from "../middleware/error.middleware.js";
import logger from "../middleware/logger.middleware.js";

const router = Router();

router.use(logger);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/student", studentRoutes);
router.use("/alumni", alumniRoutes);
router.use("/admin", adminRoutes);
router.use("/event", eventRoutes);
router.use("/chat", chatRoutes);
router.use(errorHandlerMiddleware);

export default router;
