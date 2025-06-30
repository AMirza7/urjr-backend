import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import * as controller from "../controllers/flashcardSessionController";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(controller.getAllFlashcardSessions));
router.get("/:id", asyncHandler(controller.getFlashcardSessionById));
router.post("/", asyncHandler(controller.createFlashcardSession));
router.put("/:id", asyncHandler(controller.updateFlashcardSession));
router.delete("/:id", asyncHandler(controller.deleteFlashcardSession));

export default router;
