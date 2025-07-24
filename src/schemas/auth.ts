// src/schemas/auth.ts
import { z } from "zod";

// Validate registration payload
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Phone must be a 10-digit Indian number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  role: z
    .enum([
      "lawyer",
      "junior_lawyer",
      "legal_assistant",
      "office_helper",
      "legal_clerk",
      "law_student",
      "admin",
      "user",
    ])
    .default("user"),
});

// Validate email login payload
export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

// Validate phone login payload
export const loginPhoneSchema = z.object({
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Phone must be a 10-digit Indian number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

// Validate update-profile payload (flat, no .body)
export const updateProfileSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Invalid email address").optional(),
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Phone must be a 10-digit Indian number")
      .optional(),
    password: z.string().min(8, "Password must be at least 8 characters").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Please provide at least one field to update",
    path: [],
  });
