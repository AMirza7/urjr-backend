import { Request, Response } from "express";
import { buildLegalComplaint } from "../../services/tools/legalComplaintService";
import { logToolUsage } from "../../utils/logToolUsage";

export async function generateComplaint(req: Request, res: Response) {
  const startTime = Date.now();
  try {
    const result = await buildLegalComplaint(req.body);
    res.json({ success: true, ...result });

    await logToolUsage({
      toolName: "LegalComplaintBuilder",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "success",
      startTime,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });

    await logToolUsage({
      toolName: "LegalComplaintBuilder",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "failure",
      startTime,
    });
  }
}
