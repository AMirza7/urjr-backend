// src/routes/preferences.ts
import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import asyncHandler from "../utils/asyncHandler";
import { getMyPreferences, updateMyPreferences } from "../controllers/preferencesController";

const router = Router();

router.use(requireAuth);

router.get("/me", asyncHandler(getMyPreferences));
router.patch("/me", asyncHandler(updateMyPreferences));

export default router;
