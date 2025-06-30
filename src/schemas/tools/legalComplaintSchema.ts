import { z } from "zod";

export const legalComplaintSchema = z.object({
  category: z.enum(["Dowry", "Harassment", "Rent Dispute", "Police Inaction", "Assault", "Property", "Cheque Bounce"]),
  victimName: z.string(),
  respondentName: z.string(),
  description: z.string().min(10),
  preferredLanguage: z.string().default("English")
});

export type LegalComplaintInput = z.infer<typeof legalComplaintSchema>;
