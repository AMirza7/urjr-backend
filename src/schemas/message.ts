import { z } from "zod";

export const messageSchema = z.object({
  recipientId: z.string().uuid(),
  subject: z.string().min(1, "Subject is required"),
  content: z.string().min(1, "Message content is required"),
  caseId: z.string().uuid().optional().nullable(),
  attachments: z.array(z.string().uuid()).optional(),
});
