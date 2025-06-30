import { z } from "zod";

export const flashcardSessionSchema = z.object({
  userId: z.string().uuid(),
  category: z.string(),
  totalCards: z.number().int(),
  correctAnswers: z.number().int(),
  score: z.number(),
  timeSpent: z.number().int(),
  completedAt: z.string().datetime(),
});
