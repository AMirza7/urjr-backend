// src/routes/clerks.ts
import { Router } from "express";
import requireAuth from "../middleware/requireAuth";

import {
  getClerks
} from "../controllers/clerksController";

import {
  hireClerk,
  listHires
} from "../controllers/hireController";

import {
  rateClerk,
  listRatings,
  getRatingSummary
} from "../controllers/ratingController";

import {
  updateAvailability,
  getClerkAvailability
} from "../controllers/availabilityController";

const router = Router();

// Clerk listing with filters
router.get("/", requireAuth, getClerks);

// Clerk availability
router.get(
  "/:clerkId/availability",
  requireAuth,
  getClerkAvailability
);
router.put(
  "/:clerkId/availability",
  requireAuth,
  updateAvailability
);

// Clerk hires
router.post(
  "/:clerkId/hire",
  requireAuth,
  hireClerk
);
router.get(
  "/:clerkId/hires",
  requireAuth,
  listHires
);

// Clerk ratings
router.post(
  "/:clerkId/rate",
  requireAuth,
  rateClerk
);
router.get(
  "/:clerkId/ratings",
  requireAuth,
  listRatings
);
router.get(
  "/:clerkId/rating-summary",
  requireAuth,
  getRatingSummary
);

export default router;
