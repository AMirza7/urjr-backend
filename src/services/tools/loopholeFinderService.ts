import { loopholeFinderSchema } from "../../schemas/tools/loopholeFinderSchema";

export async function findLoopholes(payload: unknown) {
  const parsed = loopholeFinderSchema.safeParse(payload);
  if (!parsed.success) throw new Error(parsed.error.errors[0].message);

  const { text } = parsed.data;
  const lowerText = text.toLowerCase();

  const findings: string[] = [];

  if (lowerText.includes("ipc 498a") && !lowerText.includes("medical")) {
    findings.push("Missing medical evidence details for IPC 498A – could weaken the complaint.");
  }

  if (lowerText.includes("ipc 420") && !lowerText.includes("intention")) {
    findings.push("IPC 420 requires proof of fraudulent intention at inception – not clearly mentioned.");
  }

  if (lowerText.includes("civil court") && lowerText.includes("compensation")) {
    findings.push("Compensation claim should clarify pecuniary jurisdiction.");
  }

  if (!lowerText.includes("jurisdiction")) {
    findings.push("Jurisdiction not mentioned – may lead to rejection.");
  }

  if (!lowerText.includes("date") || !lowerText.includes("time")) {
    findings.push("Timeline details missing – weakens factual credibility.");
  }

  return {
    loopholes: findings,
    count: findings.length,
    tips: findings.length
      ? "Consider reviewing the FIR with a legal expert before proceeding."
      : "No obvious issues found, but legal vetting is still advised.",
  };
}
