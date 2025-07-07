// src/controllers/adminController.ts
import { Request, Response, NextFunction } from "express";
import User from "../models/User";

// List users, with optional filtering
export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { verified, suspended, role, q } = req.query;

    const where: any = {};
    if (verified !== undefined) where.isVerified = verified === "true";
    if (suspended !== undefined) where.isActive = suspended !== "true";
    if (role) where.role = role;
    if (q) {
      where.name = { $iLike: `%${q}%` }; // For PostgreSQL (Sequelize: Op.iLike)
    }

    const users = await User.findAll({ where });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Suspend or unsuspend a user
export const suspendUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { suspend } = req.body; // {suspend: true/false}

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isActive = !suspend;
    user.suspendedAt = suspend ? new Date() : null;
    await user.save();

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Approve or unapprove a user
export const approveUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { approve } = req.body; // {approve: true/false}

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isApproved = !!approve;
    await user.save();

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Grant/revoke verification badge
export const setVerificationBadge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { badge } = req.body; // {badge: true/false}

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.hasVerificationBadge = !!badge;
    await user.save();

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Change a user's role
export const updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { role } = req.body; // { role: "lawyer" | ... }
  
      if (!role) return res.status(400).json({ error: "Role is required" });
  
      const allowedRoles = [
        "lawyer",
        "junior_lawyer",
        "legal_assistant",
        "office_helper",
        "legal_clerk",
        "law_student",
        "admin",
        "user",
      ];
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
      }
  
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      user.role = role;
      await user.save();
  
      res.json(user);
    } catch (err) {
      next(err);
    }
  };
  

  // Get user stats for admin dashboard
export const getUserStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const total = await User.count();
      const byRole = await User.findAll({
        attributes: ["role", [User.sequelize!.fn("COUNT", User.sequelize!.col("role")), "count"]],
        group: ["role"],
        raw: true,
      });
      const suspended = await User.count({ where: { isActive: false } });
  
      res.json({ total, byRole, suspended });
    } catch (err) {
      next(err);
    }
  };
  