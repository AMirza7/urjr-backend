import { Request, Response } from "express";
import { analyzePerjury } from "../../services/tools/perjuryScreenerService";
import { logToolUsage } from "../../utils/logToolUsage";

export async function checkPerjury(req: Request, res: Response) {
  const startTime = Date.now();

  try {
    const result = await analyzePerjury(req.body);
    res.json({ success: true, ...result });

    await logToolUsage({
      toolName: "PerjuryScreener",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "success",
      startTime,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });

    await logToolUsage({
      toolName: "PerjuryScreener",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "failure",
      startTime,
    });
  }
}
