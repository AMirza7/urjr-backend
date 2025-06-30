import { poaBuilderSchema } from "../../schemas/tools/poaBuilderSchema";

const poaTemplates = {
  general: {
    property: `This General Power of Attorney is made for property-related matters...`,
    passport: `This General Power of Attorney is granted for passport formalities...`,
    banking: `This General Power of Attorney allows the agent to manage banking operations...`,
    court: `This is to appoint an attorney for court appearances and submissions...`,
    misc: `This General Power of Attorney grants the agent discretionary powers...`,
  },
  special: {
    property: `This Special PoA is for selling/buying property described below...`,
    passport: `This Special PoA is strictly for applying/renewing passport...`,
    banking: `This Special PoA allows one-time withdrawal from bank account...`,
    court: `This Special PoA authorizes the agent to appear in the case of...`,
    misc: `This Special Power of Attorney is created for the following task...`,
  },
};

export async function generatePOA(payload: unknown) {
  const parsed = poaBuilderSchema.safeParse(payload);
  if (!parsed.success) throw new Error(parsed.error.errors[0].message);

  const { type, purpose, principalName, agentName, location } = parsed.data;

  const template = poaTemplates[type][purpose];

  const finalText = `
POWER OF ATTORNEY

I, ${principalName}, residing at ${location}, do hereby appoint ${agentName}, residing at the same city, as my lawful attorney.

${template}

Signed this day at ${location}.

(Signature of Principal)
`;

  return {
    preview: finalText.trim(),
    notarizationTip: "Ensure this is notarized and registered with local sub-registrar.",
  };
}
