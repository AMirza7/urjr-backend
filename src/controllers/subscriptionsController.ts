// src/controllers/subscriptionsController.ts
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import Subscription from "../models/Subscription";

export const getMySubscriptions = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const subs = await Subscription.findAll({
    where: { userId },
    order: [["startDate", "DESC"]],
  });
  res.json(subs);
});
