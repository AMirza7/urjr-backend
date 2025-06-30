import { stampDutySchema } from "../../schemas/tools/stampDutySchema";

const STAMP_DUTY_TABLE: Record<string, number> = {
  Delhi: 6,
  Telangana: 7,
  Maharashtra: 5,
  Karnataka: 5,
  TamilNadu: 7,
  Kerala: 8,
  Default: 6,
};

export async function calculateStampDuty(payload: unknown) {
  const parsed = stampDutySchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message);
  }

  const { state, propertyType, propertyValue, buyerGender } = parsed.data;

  const baseRate = STAMP_DUTY_TABLE[state] ?? STAMP_DUTY_TABLE["Default"];
  let rate = baseRate;

  if (state === "Delhi" && buyerGender === "Female") {
    rate = 4; // discounted rate
  }

  const dutyAmount = (rate / 100) * propertyValue;
  const registrationFee = 1000;

  return {
    success: true,
    state,
    propertyType,
    buyerGender,
    propertyValue,
    dutyAmount,
    registrationFee,
    totalPayable: dutyAmount + registrationFee,
  };
}
