import { RequestHandler } from "express";
import { AnyZodObject } from "zod";

/**
 * Validate `req.body` against a zod schema, throwing 400 if invalid.
 */
export function validate(schema: AnyZodObject): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
     res.status(400).json({ error: result.error.flatten() });
     return
    }
    next();
  };
}
