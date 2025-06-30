import { z } from "zod";

export const perjuryScreenerSchema = z.object({
  text: z.string().min(30, "Complaint text too short"),
});
