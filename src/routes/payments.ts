// src/routes/payments.ts
import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import { initiatePayment, handleWebhook } from "../controllers/paymentsController";

const router = Router();

// POST /api/payments/initiate
router.post("/initiate", requireAuth, initiatePayment);

// POST /api/payments/webhook    (no auth, gateway signs this)
router.post("/webhook", handleWebhook);

export default router;
