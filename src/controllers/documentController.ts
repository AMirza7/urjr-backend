// src/controllers/documentController.ts
import { Request, Response, NextFunction } from "express";
import Document from "../models/Document";
import { createDocumentSchema, updateDocumentSchema, documentIdParamSchema } from "../schemas/document";

// Get all documents for user (optionally filtered by caseFolder)
export const getAllDocuments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const where: any = { userId: req.user.id };
    if (req.query.caseFolderId) where.caseFolderId = req.query.caseFolderId;
    const docs = await Document.findAll({ where });
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

// Get single document (must belong to user)
export const getDocumentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = documentIdParamSchema.parse(req.params);
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const doc = await Document.findOne({ where: { id, userId: req.user.id } });
    if (!doc) return res.status(404).json({ error: "Document not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

// Upload (create) document
export const createDocument = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const parsed = createDocumentSchema.parse(req.body);
    const doc = await Document.create({
      ...parsed,
      userId: req.user.id,
      isEncrypted: parsed.isEncrypted ?? false,
    });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

// Update (name, tags, isEncrypted)
export const updateDocument = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = documentIdParamSchema.parse(req.params);
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const doc = await Document.findOne({ where: { id, userId: req.user.id } });
    if (!doc) return res.status(404).json({ error: "Document not found" });
    const parsed = updateDocumentSchema.parse(req.body);
    await doc.update(parsed);
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

// Delete document (soft delete)
export const deleteDocument = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = documentIdParamSchema.parse(req.params);
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const doc = await Document.findOne({ where: { id, userId: req.user.id } });
    if (!doc) return res.status(404).json({ error: "Document not found" });
    await doc.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
