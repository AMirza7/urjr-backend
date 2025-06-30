import { z } from "zod";

export const bailStrategySchema = z.object({
  wasRejectedBefore: z.boolean(),
  parityIgnored: z.boolean(),
  freshGrounds: z.boolean(),
  section: z.string().min(2),
});
