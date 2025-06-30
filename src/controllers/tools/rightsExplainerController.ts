import { Request, Response } from "express";
import { explainRights } from "../../services/tools/rightsExplainerService";
import { logToolUsage } from "../../utils/logToolUsage";

export async function generateRightsSummary(req: Request, res: Response) {
  const startTime = Date.now();
  try {
    const result = await explainRights(req.body);
    res.json({ success: true, ...result });

    await logToolUsage({
      toolName: "RightsExplainer",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "success",
      startTime,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });

    await logToolUsage({
      toolName: "RightsExplainer",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "failure",
      startTime,
    });
  }
}
