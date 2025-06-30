import { z } from "zod";

export const bailPredictorSchema = z.object({
  sections: z.array(z.string()).min(1),
  age: z.number().min(1),
  gender: z.enum(["male", "female", "other"]),
  location: z.string(),
});
