import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import * as notificationController from "../controllers/notificationController";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(notificationController.getMyNotifications));
router.patch("/:id/read", asyncHandler(notificationController.markNotificationRead));

export default router;
