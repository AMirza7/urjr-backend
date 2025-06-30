import { Request, Response } from "express";
import { checkQuashEligibility } from "../../services/tools/quashEligibilityService";
import { logToolUsage } from "../../utils/logToolUsage";

export async function analyzeQuashRequest(req: Request, res: Response) {
  const startTime = Date.now();
  try {
    const result = await checkQuashEligibility(req.body);
    res.json({ success: true, ...result });

    await logToolUsage({
      toolName: "QuashEligibilityAnalyzer",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "success",
      startTime,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });

    await logToolUsage({
      toolName: "QuashEligibilityAnalyzer",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "failure",
      startTime,
    });
  }
}
