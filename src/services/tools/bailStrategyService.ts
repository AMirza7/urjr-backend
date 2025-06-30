import { bailStrategySchema } from "../../schemas/tools/bailStrategySchema";

export async function generateBailStrategy(payload: unknown) {
  const parsed = bailStrategySchema.safeParse(payload);
  if (!parsed.success) throw new Error(parsed.error.errors[0].message);

  const { wasRejectedBefore, parityIgnored, freshGrounds, section } = parsed.data;

  const lines: string[] = [];

  if (!wasRejectedBefore) {
    lines.push("This is a **first bail application**, so chances are higher with proper submission.");
  } else {
    lines.push("This is a **second bail attempt**. You need strong changed circumstances or new evidence.");
    if (freshGrounds) {
      lines.push("- ✅ You have new grounds. This strengthens your application.");
    } else {
      lines.push("- ❌ No new grounds provided. Court may reject as 'no change in circumstance.'");
    }
    if (parityIgnored) {
      lines.push("- 🔁 Earlier bail ignored parity (others with same charges got bail). This can now be highlighted.");
    }
  }

  const commonTips = `➡️ Mention Section: ${section}\n➡️ Keep documents of arrest, charge sheet status, and medical/family dependency ready.\n➡️ Mention delay in trial or police inaction.\n➡️ Consider applying before Sessions Court or High Court if lower court rejected.`;

  return {
    strategy: lines.join("\n"),
    tips: commonTips,
    formatNote: "Premium users can download a ready-to-use bail application format.",
  };
}
