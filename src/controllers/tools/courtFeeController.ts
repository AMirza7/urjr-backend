import { Request, Response } from "express";
import { estimateCourtFee } from "../../services/tools/courtFeeService";
import { logToolUsage } from "../../utils/logToolUsage";

export async function generateCourtFeeEstimate(req: Request, res: Response) {
  const startTime = Date.now();
  try {
    const result = await estimateCourtFee(req.body);
    res.json({ success: true, ...result });

    await logToolUsage({
      toolName: "CourtFeeEstimator",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "success",
      startTime,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });

    await logToolUsage({
      toolName: "CourtFeeEstimator",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "failure",
      startTime,
    });
  }
}
