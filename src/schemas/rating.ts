import { z } from 'zod';

export const rateClerkSchema = z.object({
  // Merge in the path param
  clerkId: z
    .string({ required_error: 'clerkId is required' })
    .uuid('clerkId must be a valid UUID'),

  // Score must be an integer 1–5
  score: z
    .number({ invalid_type_error: 'score must be a number' })
    .int('score must be an integer')
    .min(1, { message: 'score must be at least 1' })
    .max(5, { message: 'score cannot exceed 5' }),

  // Comment is optional or null. If present, must be at least 1 character.
  comment: z
    .string()
    .min(1, { message: 'comment cannot be empty' })
    .optional()
    .or(z.literal(null)),
});
