import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../types/roles";
import User from "../models/User";

interface TokenPayload {
  sub: string;
  role: Role;
}

const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const token = header.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    const user = await User.findByPk(payload.sub);
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    req.user = { id: user.id.toString(), role: user.role as Role };
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default requireAuth;
