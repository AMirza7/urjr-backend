import { z } from "zod";

export const stampDutySchema = z.object({
  state: z.string(),
  propertyType: z.string(),
  propertyValue: z.number().positive(),
  buyerGender: z.string(),
});

export type StampDutyInput = z.infer<typeof stampDutySchema>;
