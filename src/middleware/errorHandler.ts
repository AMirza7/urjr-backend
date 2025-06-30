import { Request, Response, NextFunction } from "express";

/**
 * Centralized error handler middleware for Express.
 */
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  const status =
    typeof err.statusCode === "number"
      ? err.statusCode
      : typeof err.status === "number"
      ? err.status
      : 500;

  const message =
    typeof err.message === "string"
      ? err.message
      : "Internal Server Error";

  res.status(status).json({ error: message });
};

export default errorHandler;
