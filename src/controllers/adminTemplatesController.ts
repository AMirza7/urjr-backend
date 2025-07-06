// src/controllers/adminTemplatesController.ts
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import LegalTemplate from "../models/LegalTemplate";
import Notification from "../models/Notification";

export const listPendingTemplates = asyncHandler(async (req, res) => {
  const pending = await LegalTemplate.findAll({
    where: { status: 'pending' },
    order: [['createdAt','ASC']],
  });
  res.json(pending);
});

export const approveTemplate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tpl = await LegalTemplate.findByPk(id);
  if (!tpl) return res.status(404).json({ error: "Not found" });

  tpl.status = 'approved';
  tpl.rejectionReason = null;
  await tpl.save();

  await Notification.create({
    userId: tpl.userId,
    type: 'template_approved',
    message: `Your template "${tpl.title}" has been approved.`,
    meta: { templateId: tpl.id },
  });

  res.json(tpl);
});

export const rejectTemplate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  const tpl = await LegalTemplate.findByPk(id);
  if (!tpl) return res.status(404).json({ error: "Not found" });

  tpl.status = 'rejected';
  tpl.rejectionReason = reason;
  await tpl.save();

  await Notification.create({
    userId: tpl.userId,
    type: 'template_rejected',
    message: `Your template "${tpl.title}" was rejected: ${reason}`,
    meta: { templateId: tpl.id },
  });

  res.json(tpl);
});
