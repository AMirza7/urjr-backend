import { z } from "zod";

export const poaBuilderSchema = z.object({
  type: z.enum(["general", "special"]),
  purpose: z.enum(["property", "passport", "banking", "court", "misc"]),
  principalName: z.string().min(3),
  agentName: z.string().min(3),
  location: z.string().min(2),
});
