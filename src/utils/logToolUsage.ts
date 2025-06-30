import LegalToolLog from "../models/LegalToolLog";

export async function logToolUsage({
  toolName,
  userId,
  inputSummary,
  status,
  startTime
}: {
  toolName: string;
  userId?: string;
  inputSummary?: any;
  status: "success" | "failure";
  startTime: number;
}) {
  try {
    const durationMs = Date.now() - startTime;
    await LegalToolLog.create({
      toolName,
      userId,
      inputSummary,
      status,
      durationMs,
    });
  } catch (error) {
    console.error("❌ Failed to log tool usage:", error);
  }
}
