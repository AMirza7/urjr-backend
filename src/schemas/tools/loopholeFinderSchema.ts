import { z } from "zod";

export const loopholeFinderSchema = z.object({
  text: z.string().min(30, "Complaint content is too short"),
});
