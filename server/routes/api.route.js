import { Router } from "express";
import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import adminRoutes from "./admin.route.js";
import eventRoutes from "./event.route.js";
import studentRoutes from "./student.route.js";
import errorHandlerMiddleware from "../middleware/error.middleware.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/student", studentRoutes);
router.use("/admin", adminRoutes);
router.use("/event", eventRoutes);
router.use(errorHandlerMiddleware);

export default router;
