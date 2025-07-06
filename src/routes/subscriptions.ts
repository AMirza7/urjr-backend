// src/routes/subscriptions.ts
import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import { getMySubscriptions } from "../controllers/subscriptionsController";

const router = Router();

// GET /api/subscriptions
router.get("/", requireAuth, getMySubscriptions);

export default router;
