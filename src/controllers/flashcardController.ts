import { Request, Response, NextFunction } from "express";
import Flashcard from "../models/Flashcard";
import { flashcardSchema } from "../schemas/flashcard";

// GET all flashcards
export const getAllFlashcards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const flashcards = await Flashcard.findAll();
    res.json(flashcards);
  } catch (err) {
    next(err);
  }
};

// GET single flashcard
export const getFlashcardById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const flashcard = await Flashcard.findByPk(req.params.id);
    if (!flashcard) return res.status(404).json({ error: "Flashcard not found" });
    res.json(flashcard);
  } catch (err) {
    next(err);
  }
};

// POST create
export const createFlashcard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = flashcardSchema.parse(req.body);
    const flashcard = await Flashcard.create(parsed);
    res.status(201).json(flashcard);
  } catch (err) {
    next(err);
  }
};

// PUT update
export const updateFlashcard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const flashcard = await Flashcard.findByPk(req.params.id);
    if (!flashcard) return res.status(404).json({ error: "Flashcard not found" });
    const parsed = flashcardSchema.partial().parse(req.body);
    await flashcard.update(parsed);
    res.json(flashcard);
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteFlashcard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const flashcard = await Flashcard.findByPk(req.params.id);
    if (!flashcard) return res.status(404).json({ error: "Flashcard not found" });
    await flashcard.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
