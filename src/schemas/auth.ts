// src/schemas/auth.ts
import { z } from "zod";

// Validate registration payload
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum([
    "lawyer",
    "junior_lawyer",
    "legal_assistant",
    "office_helper",
    "legal_clerk",
    "law_student",
    "admin",
    "user"
  ]).default("user"),
});

// Validate login payload
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Validate update-profile payload (flat, no .body)
export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "Please provide at least one field to update",
  path: [],
});
