import { Router, Request, Response, NextFunction } from "express";
import { getToolUsageStats, getToolUsageByUser } from "../controllers/tools/analyticsController";
import requireAuth from "../middleware/requireAuth";

const router = Router();

// Inline admin check middleware
const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admins only" });
  }
  next();
};

router.use(requireAuth); // first ensure authentication
router.get("/stats", requireAuth, getToolUsageStats);
router.get("/user/:userId", requireAuth, getToolUsageByUser);

export default router;
