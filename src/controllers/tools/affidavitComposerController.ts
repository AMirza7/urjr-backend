import { Request, Response } from "express";
import { composeAffidavit } from "../../services/tools/affidavitComposerService";
import { logToolUsage } from "../../utils/logToolUsage";

export async function generateAffidavit(req: Request, res: Response) {
  const startTime = Date.now();
  try {
    const result = await composeAffidavit(req.body);
    res.json({ success: true, ...result });

    await logToolUsage({
      toolName: "AffidavitComposer",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "success",
      startTime,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });

    await logToolUsage({
      toolName: "AffidavitComposer",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "failure",
      startTime,
    });
  }
}
