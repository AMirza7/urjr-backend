import { z } from "zod";

export const courtFeeSchema = z.object({
  state: z.string().min(2, "State is required"),
  caseType: z.enum(["civil", "writ", "appeal", "suit", "misc"]),
  amountInvolved: z.number().min(0, "Amount must be positive"),
});
