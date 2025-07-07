// src/controllers/engagementsController.ts
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import Engagement from "../models/Engagement";
import User from "../models/User";

export const createEngagement = asyncHandler(
  async (req: Request, res: Response) => {
    const clientId = (req as any).user.id as string;
    const { clerkId, fee } = req.body;
    if (!clerkId || !fee) {
      return res.status(400).json({ error: "clerkId and fee are required" });
    }

    const numericFee = parseFloat(fee);
    const commission = parseFloat((numericFee * 0.15).toFixed(2));

    const engagement = await Engagement.create({
      clientId,
      clerkId,
      fee: numericFee,
      commission,
    });

    res.status(201).json(engagement);
  }
);

export const getEngagements = asyncHandler(
  async (req: Request, res: Response) => {
    const user = (req as any).user as User;
    const where: any =
      user.role === "legal_clerk"
        ? { clerkId: user.id }
        : { clientId: user.id };

    const engagements = await Engagement.findAll({
      where,
      include: [
        { model: User, as: "clerk", attributes: ["id", "name"] },
        { model: User, as: "client", attributes: ["id", "name"] },
      ],
    });

    res.json(engagements);
  }
);
