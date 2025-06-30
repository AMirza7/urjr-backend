import { z } from "zod";

// Flat schema for creating/updating a pinboard post
export const pinboardSchema = z.object({
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).optional(),
  priority: z.enum(["low", "medium", "high"]).default("low"),
  // No userId: always set from req.user.id in backend!
});

// For route params validation (e.g., /:id)
export const idParamSchema = z.object({
  id: z.string().uuid("Invalid post ID"),
});
