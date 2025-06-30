import { courtFeeSchema } from "../../schemas/tools/courtFeeSchema";

type FeeMeta = {
  baseFee: number;
  percentage: number;
  maxCap?: number;
};

const stateFees: Record<string, FeeMeta> = {
  Telangana: { baseFee: 200, percentage: 2, maxCap: 25000 },
  Maharashtra: { baseFee: 100, percentage: 1.5, maxCap: 20000 },
  Default: { baseFee: 150, percentage: 2, maxCap: 30000 },
};

export async function estimateCourtFee(payload: unknown) {
  const parsed = courtFeeSchema.safeParse(payload);
  if (!parsed.success) throw new Error(parsed.error.errors[0].message);

  const { state, amountInvolved } = parsed.data;

  const { baseFee, percentage, maxCap } = stateFees[state] || stateFees["Default"];

  let calculatedFee = baseFee + (amountInvolved * percentage) / 100;
  if (maxCap) calculatedFee = Math.min(calculatedFee, maxCap);

  return {
    fee: Math.round(calculatedFee),
    state,
    meta: { baseFee, percentage, maxCap },
  };
}
