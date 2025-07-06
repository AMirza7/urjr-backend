// src/routes/engagements.ts
import { Router } from "express";
import {
  createEngagement,
  getEngagements,
} from "../controllers/engagementsController";
import requireAuth from "../middleware/requireAuth";

const router = Router();

// POST /api/engagements
router.post("/", requireAuth, createEngagement);

// GET /api/engagements
router.get("/", requireAuth, getEngagements);

export default router;
