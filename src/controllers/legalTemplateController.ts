// src/controllers/legalTemplateController.ts

import { Request, Response, NextFunction } from "express";
import LegalTemplate from "../models/LegalTemplate";
import { legalTemplateSchema } from "../schemas/legalTemplate";

// GET all templates
export const getAllLegalTemplates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const templates = await LegalTemplate.findAll();
    res.json(templates);
  } catch (err) {
    next(err);
  }
};

// GET single template
export const getLegalTemplateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const template = await LegalTemplate.findByPk(req.params.id);
    if (!template)
      return res.status(404).json({ error: "Template not found" });
    res.json(template);
  } catch (err) {
    next(err);
  }
};

// POST create
export const createLegalTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate input
    const parsed = legalTemplateSchema.parse(req.body);

    // Include the authenticated user's ID
    const userId = (req as any).user.id as string;

    // Create the template, including userId
    const template = await LegalTemplate.create({
      userId,
      ...parsed,
      downloads: 0,       // default downloads
      status: "pending",  // default status
    });

    res.status(201).json(template);
  } catch (err) {
    next(err);
  }
};

// PUT update
export const updateLegalTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const template = await LegalTemplate.findByPk(req.params.id);
    if (!template)
      return res.status(404).json({ error: "Template not found" });

    const parsed = legalTemplateSchema.partial().parse(req.body);
    await template.update(parsed);
    res.json(template);
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteLegalTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const template = await LegalTemplate.findByPk(req.params.id);
    if (!template)
      return res.status(404).json({ error: "Template not found" });

    await template.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
