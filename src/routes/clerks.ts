// src/routes/clerks.ts
import { Router } from "express";
import { getClerks } from "../controllers/clerksController";
import requireAuth from "../middleware/requireAuth";

const router = Router();

// GET /api/clerks?availabilityStatus=available
router.get("/", requireAuth, getClerks);

export default router;
