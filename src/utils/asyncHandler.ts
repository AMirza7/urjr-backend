import { Request, Response, NextFunction, RequestHandler } from "express";

// Usage: router.get("/", asyncHandler(async (req, res) => { ... }));
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;
