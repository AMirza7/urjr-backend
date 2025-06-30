import { z } from "zod";

export const quashEligibilitySchema = z.object({
  isCompoundable: z.boolean(),
  sameStateAccused: z.boolean(),
  settlementAchieved: z.boolean(),
  sections: z.array(z.string()).min(1),
});
