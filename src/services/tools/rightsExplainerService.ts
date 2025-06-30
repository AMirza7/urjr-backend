import { rightsExplainerSchema } from "../../schemas/tools/rightsExplainerSchema";

const rightsMatrix: Record<string, Record<string, string>> = {
  "buying property": {
    citizen: "Right to verify title deed, encumbrance certificate, and RERA registration.",
    woman: "Women may get lower stamp duty in some states like Delhi or UP.",
    senior: "You can nominate legal heirs easily through will registration or PoA.",
    tenant: "Tenants cannot be evicted arbitrarily—rent control laws apply.",
  },
  "getting arrested": {
    citizen: "You must be informed of the reason for arrest and can seek legal counsel immediately.",
    woman: "Women can only be arrested by female officers and not after sunset.",
    minor: "Minors must be produced before the Juvenile Justice Board, not regular court.",
    senior: "Elderly can seek protection under Maintenance and Welfare of Parents Act.",
  },
  "starting business": {
    business_owner: "You must register your business under MSME/Udyam. Check Shops & Establishment Act too.",
    citizen: "You are entitled to GST registration if turnover exceeds Rs. 20 lakh.",
  },
};

export async function explainRights(payload: unknown) {
  const parsed = rightsExplainerSchema.safeParse(payload);
  if (!parsed.success) throw new Error(parsed.error.errors[0].message);

  const { event, role } = parsed.data;
  const key = event.trim().toLowerCase();

  const explanation = rightsMatrix[key]?.[role];

  if (!explanation) {
    throw new Error(`No rights information found for role "${role}" and event "${event}"`);
  }

  return {
    role,
    event,
    explanation,
  };
}
