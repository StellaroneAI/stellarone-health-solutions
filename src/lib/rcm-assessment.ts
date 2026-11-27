export interface RcmAssessmentInput {
  claimVolume: number;
  specialty: string;
  denialRate: number;
  averageClaimValue?: number;
  recoverablePercent?: number;
}

/** A scenario, not a prediction: specialty never implies an invented reimbursement rate. */
export function assessRcm(input: RcmAssessmentInput) {
  if (!Number.isSafeInteger(input.claimVolume) || input.claimVolume < 1 || input.claimVolume > 1_000_000) {
    throw new Error("Enter a monthly claim volume between 1 and 1,000,000.");
  }
  if (!input.specialty.trim()) throw new Error("Choose a specialty.");
  if (!Number.isFinite(input.denialRate) || input.denialRate < 0 || input.denialRate > 100) {
    throw new Error("Enter a denial rate between 0% and 100%.");
  }
  const deniedClaims = Math.round(input.claimVolume * input.denialRate / 100);
  const { averageClaimValue, recoverablePercent } = input;
  if (averageClaimValue !== undefined && (!Number.isFinite(averageClaimValue) || averageClaimValue <= 0 || averageClaimValue > 1_000_000)) {
    throw new Error("Enter an average allowed claim value above $0 and no more than $1,000,000.");
  }
  if (recoverablePercent !== undefined && (!Number.isFinite(recoverablePercent) || recoverablePercent < 0 || recoverablePercent > 100)) {
    throw new Error("Enter a recoverable share between 0% and 100%.");
  }
  // Do not round the denial count before calculating a financial scenario.
  const cashScenario = averageClaimValue !== undefined && recoverablePercent !== undefined
    ? input.claimVolume * input.denialRate / 100 * averageClaimValue * recoverablePercent / 100
    : null;
  return { deniedClaims, cashScenario };
}