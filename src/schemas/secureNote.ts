import { z } from "zod";

export const secureNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  encrypted: z.boolean().optional().default(false),
  tags: z.array(z.string()).optional().default([]),
  caseId: z.string().uuid().nullable().optional(),
  isPrivate: z.boolean().optional().default(true),
});

export type SecureNoteInput = z.infer<typeof secureNoteSchema>;
