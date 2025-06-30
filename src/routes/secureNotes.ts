import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import * as secureNoteController from "../controllers/secureNoteController";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(secureNoteController.getAllSecureNotes));
router.get("/:id", asyncHandler(secureNoteController.getSecureNoteById));
router.post("/", asyncHandler(secureNoteController.createSecureNote));
router.put("/:id", asyncHandler(secureNoteController.updateSecureNote));
router.delete("/:id", asyncHandler(secureNoteController.deleteSecureNote));

export default router;
