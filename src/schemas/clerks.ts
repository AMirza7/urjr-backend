import { z } from 'zod';

export const listClerksSchema = z.object({
  availabilityStatus: z
    .enum(['available','busy','offline'])
    .optional(),
  minRating: z
    .string()
    .regex(/^\d+(\.\d+)?$/, 'minRating must be a number')
    .transform(Number)
    .optional(),
  page: z
    .string()
    .regex(/^\d+$/, 'page must be an integer')
    .transform((s) => parseInt(s, 10))
    .optional()
    .default('1'),
  limit: z
    .string()
    .regex(/^\d+$/, 'limit must be an integer')
    .transform((s) => parseInt(s, 10))
    .optional()
    .default('20'),
});
