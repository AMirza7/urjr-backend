import { Request, Response, NextFunction, RequestHandler } from "express";
import { Role } from "../types/roles";

const authorize = (...roles: Role[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    next();
  };
};

export default authorize;
