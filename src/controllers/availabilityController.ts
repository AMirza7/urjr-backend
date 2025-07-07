// src/controllers/availabilityController.ts
import { Request, Response } from "express";
import { catchAsync }       from "../middleware/errorWrapper";
import requireAuth          from "../middleware/requireAuth";
import User                 from "../models/User";

// PUT /api/clerks/:clerkId/availability
export const updateAvailability = [
  requireAuth,
  catchAsync(async (req: Request, res: Response) => {
    const user = req.user as User;
    // Only clerks can update their own availability
    if (user.role !== "legal_clerk" || user.id !== req.params.clerkId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { availabilityStatus } = req.body as {
      availabilityStatus: "available" | "busy" | "offline";
    };
    if (!["available", "busy", "offline"].includes(availabilityStatus)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // 1) Update in DB
    user.availabilityStatus = availabilityStatus;
    await user.save();

    // 2) Broadcast via Socket.IO (if configured)
    const io = req.app.get("io");
    if (io) {
      io.emit("availabilityUpdate", {
        userId:            user.id,
        availabilityStatus,
      });
    }

    // 3) Return updated availability
    res.json({
      id:                 user.id,
      availabilityStatus: user.availabilityStatus,
    });
  }),
];

// GET /api/clerks/:clerkId/availability
export const getClerkAvailability = [
  requireAuth,
  catchAsync(async (req: Request, res: Response) => {
    const { clerkId } = req.params;
    const clerk = await User.findByPk(clerkId, {
      attributes: ["id", "availabilityStatus", "role"],
    });
    if (!clerk) {
      return res.status(404).json({ error: "Clerk not found." });
    }
    if (clerk.role !== "legal_clerk") {
      return res.status(403).json({ error: "User is not a clerk." });
    }
    res.json({ availabilityStatus: clerk.availabilityStatus });
  }),
];
