import { Request, Response, NextFunction } from "express";
import SecureNote from "../models/SecureNote";
import { secureNoteSchema } from "../schemas/secureNote";

export const getAllSecureNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await SecureNote.findAll();
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

export const getSecureNoteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await SecureNote.findByPk(req.params.id);
    if (!note) return res.status(404).json({ error: "Not found" });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

export const createSecureNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = secureNoteSchema.parse(req.body);
    const note = await SecureNote.create(parsed);
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

export const updateSecureNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await SecureNote.findByPk(req.params.id);
    if (!note) return res.status(404).json({ error: "Not found" });
    const parsed = secureNoteSchema.partial().parse(req.body);
    await note.update(parsed);
    res.json(note);
  } catch (err) {
    next(err);
  }
};

export const deleteSecureNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await SecureNote.findByPk(req.params.id);
    if (!note) return res.status(404).json({ error: "Not found" });
    await note.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
