import { z } from "zod";

export const affidavitComposerSchema = z.object({
  reason: z.enum([
    "missed_hearing",
    "adjournment",
    "exemption",
    "document_submission",
    "general"
  ]),
  name: z.string().min(3),
  location: z.string(),
});
