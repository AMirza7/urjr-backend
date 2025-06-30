import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import * as controller from "../controllers/flashcardController";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(controller.getAllFlashcards));
router.get("/:id", asyncHandler(controller.getFlashcardById));
router.post("/", asyncHandler(controller.createFlashcard));
router.put("/:id", asyncHandler(controller.updateFlashcard));
router.delete("/:id", asyncHandler(controller.deleteFlashcard));

export default router;
