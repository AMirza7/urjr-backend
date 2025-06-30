import { Request, Response, NextFunction } from "express";
import Notification from "../models/Notification";

// Get all notifications for current user
export const getMyNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const notifications = await Notification.findAll({ where: { userId: req.user.id }, order: [["createdAt", "DESC"]] });
    res.json(notifications);
  } catch (err) {
    next(err);
  }
};

// Mark a notification as read
export const markNotificationRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const notification = await Notification.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!notification) return res.status(404).json({ error: "Notification not found" });

    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } catch (err) {
    next(err);
  }
};

// Optionally, create/send notification from backend (could also be used for system events)
export const sendNotification = async (userId: string, type: "email" | "push" | "in_app", message: string) => {
  await Notification.create({ userId, type, message, isRead: false });
};
