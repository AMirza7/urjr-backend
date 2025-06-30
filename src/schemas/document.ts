// src/schemas/document.ts
import { z } from "zod";

// For create (upload)
export const createDocumentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  fileType: z.string().min(1, "File type is required"),
  fileSize: z.number().int().min(1, "File size must be > 0"),
  fileUrl: z.string().url("File URL is required"),
  tags: z.array(z.string()).optional(),
  caseFolderId: z.string().uuid().optional(),
  isEncrypted: z.boolean().optional(),
});

// For update (name/tags)
export const updateDocumentSchema = z.object({
  name: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  isEncrypted: z.boolean().optional(),
});

export const documentIdParamSchema = z.object({
  id: z.string().uuid("Invalid document ID"),
});
