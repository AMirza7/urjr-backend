import { bailPredictorSchema } from "../../schemas/tools/bailPredictorSchema";

type BailSectionInfo = {
  bailable: boolean;
  description: string;
  commonCourt: string;
  judgmentTip?: string;
};

const bailMap: Record<string, BailSectionInfo> = {
  "IPC 376": {
    bailable: false,
    description: "Rape – Non-bailable, typically tried in Sessions Court.",
    commonCourt: "Sessions Court",
    judgmentTip: "Needs strong defense + previous case support like Satish v. State of Maharashtra (2021)",
  },
  "IPC 307": {
    bailable: false,
    description: "Attempt to murder – Non-bailable.",
    commonCourt: "Sessions or Magistrate (depending on injury)",
  },
  "IPC 506": {
    bailable: true,
    description: "Criminal intimidation – Often bailable unless combined with major sections.",
    commonCourt: "Magistrate",
  },
  "IPC 498A": {
    bailable: false,
    description: "Cruelty by husband – Non-bailable but often granted with conditions.",
    commonCourt: "Magistrate",
  },
};

export async function predictBail(payload: unknown) {
  const parsed = bailPredictorSchema.safeParse(payload);
  if (!parsed.success) throw new Error(parsed.error.errors[0].message);

  const { sections, age, gender, location } = parsed.data;

  const results = sections.map(section => {
    const norm = section.toUpperCase().trim();
    const match = bailMap[norm] || {
      bailable: false,
      description: "Unknown section. Legal review needed.",
      commonCourt: "Unknown",
    };
    return { section: norm, ...match };
  });

  return {
    userContext: { age, gender, location },
    results,
    tip: "Use this as early reference only. Court decision may vary.",
  };
}
