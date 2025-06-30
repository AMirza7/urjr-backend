import { affidavitComposerSchema } from "../../schemas/tools/affidavitComposerSchema";

const affidavitReasons: Record<string, string> = {
  missed_hearing: "I could not appear in the Hon’ble Court on the scheduled date due to unavoidable circumstances. I humbly request the court to condone my absence.",
  adjournment: "I respectfully seek an adjournment in the present matter to prepare necessary documentation and consult legal counsel.",
  exemption: "I request exemption from personal appearance due to my health/work/family constraints, and authorize my counsel to appear on my behalf.",
  document_submission: "I respectfully request time to submit essential documents that are relevant for just disposal of this matter.",
  general: "I seek the court’s indulgence for the matter mentioned herein and assure compliance as per directions.",
};

export async function composeAffidavit(payload: unknown) {
  const parsed = affidavitComposerSchema.safeParse(payload);
  if (!parsed.success) throw new Error(parsed.error.errors[0].message);

  const { reason, name, location } = parsed.data;

  const body = affidavitReasons[reason] || affidavitReasons["general"];

  const fullText = `
AFFIDAVIT

I, ${name}, aged about __ years, residing at ${location}, do hereby solemnly affirm and declare as follows:

${body}

That the statements made above are true to the best of my knowledge and belief.

DEPONENT
(Signature)

Place: ${location}
Date: ___________

VERIFICATION

Verified at ${location} on this ___ day of _______ that the contents of this affidavit are true and correct.

(Signature of Deponent)
`.trim();

  return {
    affidavit: fullText,
    tip: "This affidavit can be printed on ₹10–₹50 stamp paper and notarized.",
  };
}
