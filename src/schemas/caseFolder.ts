import { z } from "zod";

export const createCaseFolderSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    caseNumber: z.string().min(1, "Case number is required"),
    clientName: z.string().min(1, "Client name is required"),
    caseType: z.string().min(1, "Case type is required"),
    court: z.string().min(1, "Court is required"),
    status: z.string().min(1, "Status is required"),
    userId: z.string().uuid("Must be a valid user ID"),
    description: z.string().min(1, "Description is required"),
  }),
});

export const updateCaseFolderSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: "Invalid CaseFolder ID" }),
  }),
  body: z.object({
    title: z.string().min(1).optional(),
    caseNumber: z.string().min(1).optional(),
    clientName: z.string().min(1).optional(),
    caseType: z.string().min(1).optional(),
    court: z.string().min(1).optional(),
    status: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
  }),
});

export const getCaseFolderSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: "Invalid CaseFolder ID" }),
  }),
});
