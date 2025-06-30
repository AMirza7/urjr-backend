import { z } from "zod";

export const sectionSuggesterSchema = z.object({
  description: z.string().min(10, "Complaint description is too short"),
});
