import { NextFunction, Request, Response } from 'express'

/**
 * Wraps an async route handler so that rejected promises
 * are forwarded to express’ errorHandler via next().
 */
export function catchAsync(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}
