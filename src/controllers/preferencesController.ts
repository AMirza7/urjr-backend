// src/controllers/preferencesController.ts

import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { preferencesSchema } from "../schemas/preferences";

// GET /api/preferences/me
export const getMyPreferences = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.preferences);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/preferences/me
// src/controllers/preferencesController.ts

export const updateMyPreferences = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) return res.status(401).json({ error: "Unauthorized" });
      const parsed = preferencesSchema.parse(req.body);
  
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      // Fill all required notification fields
      const prev = user.preferences || {};
  
      user.preferences = {
        ...prev,
        ...parsed,
        notifications: {
          ...((prev.notifications as object) ?? {}),
          ...((parsed.notifications as object) ?? {}),
          push: parsed.notifications?.push ?? prev.notifications?.push ?? false,
          email: parsed.notifications?.email ?? prev.notifications?.email ?? false,
          caseUpdates: parsed.notifications?.caseUpdates ?? prev.notifications?.caseUpdates ?? false,
          reminders: parsed.notifications?.reminders ?? prev.notifications?.reminders ?? false,
          marketing: parsed.notifications?.marketing ?? prev.notifications?.marketing ?? false,
        },
        privacy: {
          ...((prev.privacy as object) ?? {}),
          ...((parsed.privacy as object) ?? {}),
          profileVisible: parsed.privacy?.profileVisible ?? prev.privacy?.profileVisible ?? true,
          contactInfoVisible: parsed.privacy?.contactInfoVisible ?? prev.privacy?.contactInfoVisible ?? true,
          showOnlineStatus: parsed.privacy?.showOnlineStatus ?? prev.privacy?.showOnlineStatus ?? true,
        },
      };
  
      await user.save();
      res.json(user.preferences);
    } catch (err) {
      next(err);
    }
  };
  
  