// src/controllers/availabilityController.ts
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { Op } from "sequelize";
import User from "../models/User";

export const updateAvailability = asyncHandler(
  async (req: Request, res: Response) => {
    const user = (req as any).user as User;
    if (user.role !== "legal_clerk_typist") {
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

    // 2) Broadcast via Socket.IO
    const io = req.app.get("io");
    io.emit("availabilityUpdate", {
      userId: user.id,
      availabilityStatus,
    });

    // 3) Return updated user
    res.json({
      id: user.id,
      availabilityStatus: user.availabilityStatus,
    });
  }
);
