// src/middleware/auth.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../types/roles";
import User from "../models/User";

interface TokenPayload {
  sub: string; // user ID as string (UUID)
  role: Role;
}

// Fix: Do NOT declare as async, use a promise-catcher pattern for Express compatibility!
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = header.slice(7);
  let payload: TokenPayload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }

  // User lookup must use a promise but Express needs next() to not return a promise!
  User.findByPk(payload.sub)
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      // Attach user info to req
      req.user = {
        id: user.id.toString(),
        role: user.role as Role,
      };
      next();
    })
    .catch((err) => next(err));
};

export default requireAuth;
