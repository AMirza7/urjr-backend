import { z } from "zod";

export const legalTemplateSchema = z.object({
  category: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
  placeholders: z.array(z.string()).default([]),
});
