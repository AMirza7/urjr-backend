import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import Message from "../models/Message";
import User from "../models/User";
import { messageSchema } from "../schemas/message";

// Get all messages between current user and another user/case (optional)
export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    const { recipientId, caseId } = req.query;
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const where: any = {
      [Op.or]: [
        { senderId: user.id, recipientId },
        { senderId: recipientId, recipientId: user.id },
      ],
    };
    if (caseId) where.caseId = caseId;

    const messages = await Message.findAll({
      where,
      order: [["sentAt", "ASC"]],
    });
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

// Send new message
export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const parsed = messageSchema.parse(req.body);
    const recipient = await User.findByPk(parsed.recipientId);
    if (!recipient) return res.status(404).json({ error: "Recipient not found" });

    const message = await Message.create({
      senderId: user.id,
      recipientId: parsed.recipientId,
      subject: parsed.subject,
      content: parsed.content,
      caseId: parsed.caseId,
      attachments: parsed.attachments ?? [],
      sentAt: new Date(),
    });
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
};

// Mark as read
export const markMessageRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    const { id } = req.params;
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const message = await Message.findByPk(id);
    if (!message || message.recipientId !== user.id)
      return res.status(404).json({ error: "Message not found" });

    message.readAt = new Date();
    await message.save();

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
