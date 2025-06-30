// src/controllers/flashcardSessionController.ts

import { Request, Response, NextFunction } from "express";
import FlashcardSession from "../models/FlashcardSession";
import { flashcardSessionSchema } from "../schemas/flashcardSession";

// GET all flashcard sessions
export const getAllFlashcardSessions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessions = await FlashcardSession.findAll();
    res.json(sessions);
  } catch (err) {
    next(err);
  }
};

// GET one flashcard session by ID
export const getFlashcardSessionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await FlashcardSession.findByPk(req.params.id);
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json(session);
  } catch (err) {
    next(err);
  }
};

// POST create flashcard session
export const createFlashcardSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = flashcardSessionSchema.parse(req.body);
    const session = await FlashcardSession.create({
      ...parsed,
      completedAt: new Date(parsed.completedAt), // convert string to Date
    });
    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
};

// PUT update flashcard session
// PUT update flashcard session
export const updateFlashcardSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await FlashcardSession.findByPk(req.params.id);
      if (!session) return res.status(404).json({ error: "Session not found" });
      const parsed = flashcardSessionSchema.partial().parse(req.body);
  
      // Remove completedAt from parsed if present
      const { completedAt, ...rest } = parsed as typeof parsed & { completedAt?: string };
  
      await session.update({
        ...rest,
        ...(completedAt ? { completedAt: new Date(completedAt) } : {}),
      });
  
      res.json(session);
    } catch (err) {
      next(err);
    }
  };
  

// DELETE flashcard session
export const deleteFlashcardSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await FlashcardSession.findByPk(req.params.id);
    if (!session) return res.status(404).json({ error: "Session not found" });
    await session.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
