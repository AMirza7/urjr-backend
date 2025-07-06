// src/controllers/paymentsController.ts
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import Transaction from "../models/Transaction";

import Subscription from "../models/Subscription";
import User from "../models/User";

// POST /api/payments/initiate
export const initiatePayment = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as User;
  const { amount, method, planTier, planDurationMonths } = req.body;
  if (!amount || !method || !planTier || !planDurationMonths) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  // 1) Create a pending transaction
  const transaction = await Transaction.create({
    userId: user.id,
    amount,
    method,
    status: "pending",
    metadata: { planTier, planDurationMonths },
  });

  // 2) (TODO) Integrate with your payment gateway SDK here
  //    e.g. const session = await gateway.createSession({...});
  const paymentSessionUrl = `https://fake-payments.example.com/checkout/${transaction.id}`;

  res.status(201).json({ transactionId: transaction.id, paymentSessionUrl });
});

// POST /api/payments/webhook
export const handleWebhook = asyncHandler(async (req: Request, res: Response) => {
  const { transactionId, status } = req.body;
  const transaction = await Transaction.findByPk(transactionId);
  if (!transaction) return res.status(404).end();

  transaction.status = status;
  await transaction.save();

  if (status === "success") {
    const { planTier, planDurationMonths } = (transaction.metadata as any);
    const now = new Date();

    // find latest active subscription
    const existing = await Subscription.findOne({
      where: { userId: transaction.userId, status: "active" },
      order: [["endDate", "DESC"]],
    });

    let startDate = now;
    if (existing && existing.endDate > now) {
      startDate = existing.endDate;
    }

    // extend or create subscription
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + planDurationMonths);

    await Subscription.create({
      userId: transaction.userId,
      tier: planTier,
      startDate,
      endDate,
      status: "active",
    });
  }

  res.status(200).end();
});
