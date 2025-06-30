import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import * as controller from "../controllers/legalTemplateController";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(controller.getAllLegalTemplates));
router.get("/:id", asyncHandler(controller.getLegalTemplateById));
router.post("/", asyncHandler(controller.createLegalTemplate));
router.put("/:id", asyncHandler(controller.updateLegalTemplate));
router.delete("/:id", asyncHandler(controller.deleteLegalTemplate));

export default router;
