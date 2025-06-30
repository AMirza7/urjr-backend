import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import * as messageController from "../controllers/messageController";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(messageController.getMessages));
router.post("/", asyncHandler(messageController.sendMessage));
router.patch("/:id/read", asyncHandler(messageController.markMessageRead));

export default router;
