import { perjuryScreenerSchema } from "../../schemas/tools/perjuryScreenerSchema";

export async function analyzePerjury(payload: unknown) {
  const parsed = perjuryScreenerSchema.safeParse(payload);
  if (!parsed.success) throw new Error(parsed.error.errors[0].message);

  const { text } = parsed.data;
  const lower = text.toLowerCase();

  const findings: string[] = [];

  // Basic AI logic to simulate perjury red flags
  if (lower.includes("he was with me") && lower.includes("he was not there")) {
    findings.push("Conflicting statements detected: timeline mismatch.");
  }

  if (lower.includes("ipc 498a") && lower.includes("injury") && !lower.includes("medical")) {
    findings.push("Injury mentioned but no medical evidence cited.");
  }

  if (lower.includes("false case") || lower.includes("revenge")) {
    findings.push("Self-admitted intent or emotional bias found.");
  }

  if (!lower.includes("date") || !lower.includes("place") || !lower.includes("witness")) {
    findings.push("Missing event details like date, place, or witnesses.");
  }

  const counterSections = [
    "IPC 182 - False information",
    "IPC 193 - False evidence",
    "IPC 211 - False charge of offence",
  ];

  return {
    redFlags: findings,
    perjuryCounterSections: counterSections,
    suggestion: "If these issues are valid, you can file a counter-case for perjury.",
  };
}
