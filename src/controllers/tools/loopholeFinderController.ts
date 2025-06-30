import { Request, Response } from "express";
import { findLoopholes } from "../../services/tools/loopholeFinderService";
import { logToolUsage } from "../../utils/logToolUsage";

export async function detectLoopholes(req: Request, res: Response) {
  const startTime = Date.now();
  try {
    const result = await findLoopholes(req.body);
    res.json({ success: true, ...result });

    await logToolUsage({
      toolName: "ComplaintLoopholeFinder",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "success",
      startTime,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });

    await logToolUsage({
      toolName: "ComplaintLoopholeFinder",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "failure",
      startTime,
    });
  }
}
