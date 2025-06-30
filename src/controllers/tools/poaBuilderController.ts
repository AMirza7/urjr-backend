import { Request, Response } from "express";
import { generatePOA } from "../../services/tools/poaBuilderService";
import { logToolUsage } from "../../utils/logToolUsage";

export async function createPOA(req: Request, res: Response) {
  const startTime = Date.now();
  try {
    const result = await generatePOA(req.body);
    res.json({ success: true, ...result });

    await logToolUsage({
      toolName: "PoABuilder",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "success",
      startTime,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });

    await logToolUsage({
      toolName: "PoABuilder",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "failure",
      startTime,
    });
  }
}
