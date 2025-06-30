// src/utils/wrap.ts
import { Request, Response, NextFunction, Handler } from "express";

/**
 * Turn any async(req,res,next) into a plain Express Handler
 * that catches both sync throws and Promise rejections.
 */
const wrap = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): Handler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default wrap;
