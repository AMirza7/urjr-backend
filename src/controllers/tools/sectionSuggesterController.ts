import { Request, Response } from "express";
import { suggestSections } from "../../services/tools/sectionSuggesterService";
import { logToolUsage } from "../../utils/logToolUsage";

export async function generateSectionSuggestions(req: Request, res: Response) {
  const startTime = Date.now();
  try {
    const result = await suggestSections(req.body);
    res.json({ success: true, ...result });

    await logToolUsage({
      toolName: "SectionAutoSuggester",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "success",
      startTime,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });

    await logToolUsage({
      toolName: "SectionAutoSuggester",
      userId: req.user?.id,
      inputSummary: req.body,
      status: "failure",
      startTime,
    });
  }
}
