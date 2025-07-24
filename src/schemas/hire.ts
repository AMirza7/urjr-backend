// src/schemas/hire.ts
import { z } from "zod";

export const hireClerkSchema = z.object({
  clerkId: z
    .string({ required_error: "clerkId is required" })
    .uuid("clerkId must be a valid UUID"),
  
  templateId: z
    .string()
    .uuid("templateId must be a valid UUID")
    .optional()
    .or(z.literal(null)),

  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive({ message: "Amount must be greater than 0" }),

  commission: z
    .number({ invalid_type_error: "Commission must be a number" })
    .nonnegative({ message: "Commission must be zero or positive" }),
});
