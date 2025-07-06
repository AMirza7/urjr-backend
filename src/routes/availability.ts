// src/routes/availability.ts
import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import { updateAvailability } from "../controllers/availabilityController";

const router = Router();

// PATCH /api/availability
router.patch("/", requireAuth, updateAvailability);

export default router;
