import { Request, Response } from "express";
import { predictBail } from "../../services/tools/bailPredictorService";
import { logToolUsage } from "../../utils/logToolUsage";

export async function generateBailPrediction(req: Request, res: Response) {
  const startTime = Date.now();
  try {
    const result = await predictBail(req.body);
    res.json({ success: true, ...result });

    await logToolUsage({
      toolName: "BailPredictor",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "success",
      startTime,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });

    await logToolUsage({
      toolName: "BailPredictor",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "failure",
      startTime,
    });
  }
}
