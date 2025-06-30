// src/schemas/preferences.ts
import { z } from "zod";

export const preferencesSchema = z.object({
  theme: z.enum(["system", "light", "dark"]).optional(),
  language: z.string().min(2).optional(),
  notifications: z
    .object({
      push: z.boolean().optional(),
      email: z.boolean().optional(),
      caseUpdates: z.boolean().optional(),
      reminders: z.boolean().optional(),
      marketing: z.boolean().optional(),
    })
    .partial()
    .optional(),
  privacy: z
    .object({
      profileVisible: z.boolean().optional(),
      contactInfoVisible: z.boolean().optional(),
      showOnlineStatus: z.boolean().optional(),
    })
    .partial()
    .optional(),
});
