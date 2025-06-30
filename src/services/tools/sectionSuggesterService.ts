import { sectionSuggesterSchema } from "../../schemas/tools/sectionSuggesterSchema";

type SectionSuggestion = {
  section: string;
  title: string;
  matches: string[];
};

const sectionRules: SectionSuggestion[] = [
  {
    section: "IPC 498A",
    title: "Cruelty by husband or relatives",
    matches: ["dowry", "torture", "mental harassment", "abuse", "in-laws"],
  },
  {
    section: "IPC 354",
    title: "Assault on woman with intent to outrage modesty",
    matches: ["touch", "molest", "harass", "sexual"],
  },
  {
    section: "IPC 420",
    title: "Cheating and dishonestly inducing delivery of property",
    matches: ["fraud", "cheated", "property", "money", "scam"],
  },
  {
    section: "CrPC 144",
    title: "Unlawful assembly restriction",
    matches: ["gathering", "protest", "riot", "crowd"],
  },
  {
    section: "IPC 376",
    title: "Rape",
    matches: ["rape", "sexual assault", "forced"],
  },
];

export async function suggestSections(payload: unknown) {
  const parsed = sectionSuggesterSchema.safeParse(payload);
  if (!parsed.success) throw new Error(parsed.error.errors[0].message);

  const { description } = parsed.data;
  const lowerDesc = description.toLowerCase();

  const matches = sectionRules.filter(rule =>
    rule.matches.some(keyword => lowerDesc.includes(keyword))
  );

  return {
    suggestedSections: matches.map(m => ({
      section: m.section,
      title: m.title,
    })),
    count: matches.length,
  };
}
