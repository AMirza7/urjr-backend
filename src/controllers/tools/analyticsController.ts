// src/controllers/tools/analyticsController.ts
import { Request, Response } from "express";
import LegalToolLog from "../../models/LegalToolLog";
import { fn, col } from "sequelize";

// GET /api/tools/analytics/stats
export async function getToolUsageStats(req: Request, res: Response) {
  try {
    const usage = await LegalToolLog.findAll({
      attributes: [
        "toolName",
        "status",
        [fn("COUNT", col("id")), "count"],
      ],
      group: ["toolName", "status"],
      order: [["toolName", "ASC"]],
    });

    res.json({ success: true, data: usage });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// GET /api/tools/analytics/user/:userId
export async function getToolUsageByUser(req: Request, res: Response) {
  const { userId } = req.params;
  try {
    const usage = await LegalToolLog.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, data: usage });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}
