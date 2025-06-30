import { z } from "zod";

export const caseTimelineEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.coerce.date(),
  type: z.enum(["filing", "hearing", "order", "payment", "document", "meeting"]),
  status: z.enum(["completed", "upcoming", "overdue"]),
  documents: z.array(z.string().uuid()).optional().default([]),
  notes: z.string().optional(),
});
