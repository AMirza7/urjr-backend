import type { Role } from "../roles";

declare global {
  namespace Express {
    interface User {
      id: string;
      role: Role;
    }
    interface Request {
      user?: User;
    }
  }
}
