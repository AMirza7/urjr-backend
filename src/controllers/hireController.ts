// src/controllers/hireController.ts
import { Request, Response } from 'express';
import ClerkHire             from '../models/ClerkHire';
import { hireClerkSchema }   from '../schemas/hire';
import { catchAsync }        from '../middleware/errorWrapper';
import requireAuth           from '../middleware/requireAuth';
import PaymentService        from '../services/paymentService'; // ← new

// POST /api/clerks/:clerkId/hire
export const hireClerk = [
  requireAuth,
  catchAsync(async (req: Request, res: Response) => {
    const clerkId = req.params.clerkId;

    // 🚫 Prevent self-hire
    if (req.user!.id === clerkId) {
      return res
        .status(400)
        .json({ error: "You cannot hire yourself as a clerk." });
    }

    // merge path-param + body, then validate
    const input = hireClerkSchema.parse({
      clerkId,
      ...req.body,
    });

    // 1️⃣ Charge the client (stubbed)
    const transactionId = await PaymentService.chargeClient(
      req.user!.id,
      input.amount
    );

    // 2️⃣ Persist the hire with transactionId
    const hire = await ClerkHire.create({
      clerkId:      input.clerkId,
      clientId:     req.user!.id,
      templateId:   input.templateId ?? null,
      amount:       input.amount,
      commission:   input.commission,
      status:       'paid',          // assume synchronous success
      transactionId,                 // save the stubbed transaction
    });

    res.status(201).json({ hire });
  }),
];

// GET /api/clerks/:clerkId/hires
export const listHires = [
  requireAuth,
  catchAsync(async (req: Request, res: Response) => {
    const hires = await ClerkHire.findAll({
      where: { clerkId: req.params.clerkId },
      order: [['createdAt', 'DESC']],
    });
    res.json({ hires });
  }),
];
