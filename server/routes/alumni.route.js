import { Router } from "express";
import reqBodyMiddleware from "../middleware/reqBody.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import updateAlumniProfileController from "../controllers/user/alumni/updateProfile.controller.js";
import getConnectionRequestController from "../controllers/user/alumni/getConnectionRequest.controller.js";
import alumniMiddleware from "../middleware/alumni.middleware.js";
import handlePendingRequestController from "../controllers/user/alumni/handlePendingRequest.controller.js";
import getAllConnectionsController from "../controllers/user/alumni/getAllConnections.controller.js";

const router = Router();

router.use(authMiddleware);
router.use(alumniMiddleware);
router.put("/profile", reqBodyMiddleware, updateAlumniProfileController);
router.get("/requests", getConnectionRequestController);
router.patch("/requests/handle", reqBodyMiddleware, handlePendingRequestController);
router.get("/connections", getAllConnectionsController);

export default router;
