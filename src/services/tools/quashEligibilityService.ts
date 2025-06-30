import { quashEligibilitySchema } from "../../schemas/tools/quashEligibilitySchema";

export async function checkQuashEligibility(payload: unknown) {
  const parsed = quashEligibilitySchema.safeParse(payload);
  if (!parsed.success) throw new Error(parsed.error.errors[0].message);

  const { isCompoundable, sameStateAccused, settlementAchieved, sections } = parsed.data;

  const eligible =
    isCompoundable &&
    sameStateAccused &&
    settlementAchieved &&
    !sections.includes("498A") &&
    !sections.includes("376");

  const reason = !eligible
    ? [
        !isCompoundable && "Offence is not compoundable.",
        !sameStateAccused && "Accused are not from the same state.",
        !settlementAchieved && "No mutual settlement reached.",
        sections.includes("498A") && "Courts hesitate to quash 498A without HC intervention.",
        sections.includes("376") && "Section 376 (rape) is generally not quashable.",
      ]
        .filter(Boolean)
        .join(" ")
    : "Eligible under SC guidelines (Narinder Singh v. State of Punjab, Gian Singh v. State of Punjab).";

  return {
    eligible,
    message: reason,
    recommendation: eligible
      ? "Proceed to file petition under Section 482 CrPC in concerned High Court."
      : "Seek legal advice for alternative remedies like discharge or anticipatory bail.",
  };
}
