import { Request, Response } from "express";
import { generateBailStrategy } from "../../services/tools/bailStrategyService";
import { logToolUsage } from "../../utils/logToolUsage";

export async function generateBailRefilingStrategy(req: Request, res: Response) {
  const startTime = Date.now();
  try {
    const result = await generateBailStrategy(req.body);
    res.json({ success: true, ...result });

    await logToolUsage({
      toolName: "BailStrategyGenerator",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "success",
      startTime,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });

    await logToolUsage({
      toolName: "BailStrategyGenerator",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "failure",
      startTime,
    });
  }
}
