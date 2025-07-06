// src/routes/adminTemplates.ts

import { Router, Request, Response, NextFunction } from "express";
import requireAuth from "../middleware/requireAuth";
import {
  listPendingTemplates,
  approveTemplate,
  rejectTemplate,
} from "../controllers/adminTemplatesController";

const router = Router();

// Admin-only guard
const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore: requireAuth injected req.user
  if ((req as any).user.role !== "admin") {
    // send the forbidden response and exit without returning a value
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  next();
};

// GET /api/admin/templates/pending
router.get(
  "/pending",
  requireAuth,
  requireAdmin,
  listPendingTemplates
);

// POST /api/admin/templates/:id/approve
router.post(
  "/:id/approve",
  requireAuth,
  requireAdmin,
  approveTemplate
);

// POST /api/admin/templates/:id/reject
router.post(
  "/:id/reject",
  requireAuth,
  requireAdmin,
  rejectTemplate
);

export default router;
