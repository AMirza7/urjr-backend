import { z } from "zod";

export const rightsExplainerSchema = z.object({
  event: z.string().min(3, "Event is required"),
  role: z.enum(["citizen", "woman", "minor", "senior", "tenant", "business_owner"]),
});
