import { Request, Response } from "express";
import { calculateStampDuty } from "../../services/tools/stampDutyService";
import { logToolUsage } from "../../utils/logToolUsage";

export async function getStampDuty(req: Request, res: Response) {
  const startTime = Date.now();
  try {
    const result = await calculateStampDuty(req.body);
    res.json(result);


    await logToolUsage({
      toolName: "StampDutyCalculator",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "success",
      startTime,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });

    await logToolUsage({
      toolName: "StampDutyCalculator",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "failure",
      startTime,
    });
  }
}
