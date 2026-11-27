import { test } from "node:test";
import assert from "node:assert/strict";
import { assessRcm } from "./rcm-assessment";

test("denied claims are volume multiplied by denial percentage", () => {
  assert.equal(assessRcm({ claimVolume: 5000, specialty: "Primary care", denialRate: 8 }).deniedClaims, 400);
});
test("cash recovery is withheld without both visitor-supplied financial assumptions", () => {
  assert.equal(assessRcm({ claimVolume: 5000, specialty: "Primary care", denialRate: 8 }).cashScenario, null);
  assert.equal(assessRcm({ claimVolume: 5000, specialty: "Primary care", denialRate: 8, averageClaimValue: 150 }).cashScenario, null);
});
test("cash scenario uses the supplied allowed amount and recoverable share", () => {
  assert.equal(assessRcm({ claimVolume: 5000, specialty: "Primary care", denialRate: 8, averageClaimValue: 150, recoverablePercent: 50 }).cashScenario, 30000);
});
test("specialty does not invent financial adjustments", () => {
  const base = { claimVolume: 1000, denialRate: 10, averageClaimValue: 200, recoverablePercent: 25 };
  assert.equal(assessRcm({ ...base, specialty: "Primary care" }).cashScenario, assessRcm({ ...base, specialty: "Behavioral health" }).cashScenario);
});
test("zero denials produce zero denied claims and zero scenario", () => {
  assert.deepEqual(assessRcm({ claimVolume: 5000, specialty: "Primary care", denialRate: 0, averageClaimValue: 150, recoverablePercent: 50 }), { deniedClaims: 0, cashScenario: 0 });
});
test("invalid volume and percentages are rejected", () => {
  assert.throws(() => assessRcm({ claimVolume: 0, specialty: "Primary care", denialRate: 8 }));
  assert.throws(() => assessRcm({ claimVolume: 5000, specialty: "Primary care", denialRate: 101 }));
  assert.throws(() => assessRcm({ claimVolume: 5000, specialty: "Primary care", denialRate: 8, recoverablePercent: -1 }));
});