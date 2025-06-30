// src/routes/documents.ts

import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import * as documentController from "../controllers/documentController";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(documentController.getAllDocuments));
router.get("/:id", asyncHandler(documentController.getDocumentById));
router.post("/", asyncHandler(documentController.createDocument));
router.put("/:id", asyncHandler(documentController.updateDocument));
router.delete("/:id", asyncHandler(documentController.deleteDocument));

export default router;
