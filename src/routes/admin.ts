// src/routes/admin.ts
import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import authorize from "../middleware/authorize";
import * as adminController from "../controllers/adminController";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

// All routes protected: must be authenticated as admin
router.use(requireAuth, authorize("admin"));

router.get("/users", asyncHandler(adminController.listUsers));
router.patch("/users/:id/suspend", asyncHandler(adminController.suspendUser));
router.patch("/users/:id/approve", asyncHandler(adminController.approveUser));
router.patch("/users/:id/badge", asyncHandler(adminController.setVerificationBadge));
router.get("/stats", asyncHandler(adminController.getUserStats));

export default router;
