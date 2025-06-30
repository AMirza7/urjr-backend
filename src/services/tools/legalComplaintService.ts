// src/services/tools/legalComplaintService.ts
import { legalComplaintSchema } from "../../schemas/tools/legalComplaintSchema";

export async function buildLegalComplaint(payload: unknown) {
  const parsed = legalComplaintSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message);
  }

  const { category, victimName, respondentName, description, preferredLanguage } = parsed.data;

  const complaint = `
To,
The Officer In-Charge
Police Station

Subject: Complaint regarding ${category}

Respected Sir/Madam,

I, ${victimName}, would like to file a complaint against ${respondentName} concerning the matter detailed below:

"${description}"

I request you to take immediate action as per the relevant sections of the law. I am ready to cooperate fully with the investigation.

Thank you.

Sincerely,
${victimName}
`;

  const meta = {
    category,
    suggestedAction:
      category === "Police Inaction"
        ? "Approach SP / File 156(3) before Magistrate"
        : "File FIR at nearest Police Station",
    format: "FIR",
    language: preferredLanguage,
  };

  return {
    complaint,
    meta,
  };
}
