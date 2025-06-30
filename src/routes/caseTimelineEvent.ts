import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import * as controller from "../controllers/caseTimelineEventController";
import asyncHandler from "../utils/asyncHandler";

const router = Router({ mergeParams: true });

router.use(requireAuth);

router.get("/", asyncHandler(controller.getTimelineEvents));
router.post("/", asyncHandler(controller.createTimelineEvent));
router.patch("/:eventId", asyncHandler(controller.updateTimelineEvent));
router.delete("/:eventId", asyncHandler(controller.deleteTimelineEvent));

export default router;
