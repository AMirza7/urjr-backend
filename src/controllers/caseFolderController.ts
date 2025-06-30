// src/controllers/caseFolderController.ts

import { Request, Response, NextFunction } from "express";
import CaseFolder from "../models/CaseFolder";
import { createCaseFolderSchema, updateCaseFolderSchema, getCaseFolderSchema } from "../schemas/caseFolder";

/**
 * Get all case folders for the authenticated user.
 */
export const getAllCaseFolders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // @ts-ignore
    const caseFolders = await CaseFolder.findAll({ where: { userId: req.user.id } });
    res.json(caseFolders);
  } catch (err) {
    next(err);
  }
};

/**
 * Get a single case folder by ID (must belong to user).
 */
export const getCaseFolderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Validate params
    getCaseFolderSchema.parse({ params: req.params });

    // @ts-ignore
    const caseFolder = await CaseFolder.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!caseFolder) {
      return res.status(404).json({ error: "Case folder not found" });
    }

    res.json(caseFolder);
  } catch (err) {
    next(err);
  }
};

/**
 * Create a new case folder for the authenticated user.
 */
export const createCaseFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Validate input
    const parsed = createCaseFolderSchema.parse({ body: req.body });

    // @ts-ignore
    const newCaseFolder = await CaseFolder.create({
      ...parsed.body,
      userId: req.user.id
    });

    res.status(201).json(newCaseFolder);
  } catch (err) {
    next(err);
  }
};

/**
 * Update a case folder (must belong to user).
 */
export const updateCaseFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Validate input (body and params)
    updateCaseFolderSchema.parse({ params: req.params, body: req.body });

    // @ts-ignore
    const caseFolder = await CaseFolder.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!caseFolder) {
      return res.status(404).json({ error: "Case folder not found" });
    }

    await caseFolder.update(req.body);

    res.json(caseFolder);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a case folder (must belong to user).
 */
export const deleteCaseFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Validate params
    getCaseFolderSchema.parse({ params: req.params });

    // @ts-ignore
    const caseFolder = await CaseFolder.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!caseFolder) {
      return res.status(404).json({ error: "Case folder not found" });
    }

    await caseFolder.destroy();

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
