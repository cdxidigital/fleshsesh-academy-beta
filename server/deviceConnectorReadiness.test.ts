import { describe, expect, it } from "vitest";
import { deviceConnectorReadiness, isNonLiveConnectorReferenceSafe } from "@shared/deviceConnectorReadiness";

describe("non-live device connector readiness", () => {
  it("prohibits all device access, pairing, telemetry, and control", () => {
    expect(isNonLiveConnectorReferenceSafe()).toBe(true);
    expect(deviceConnectorReadiness.prohibited).toEqual(expect.arrayContaining(["device discovery", "pairing", "telemetry collection", "device control"]));
  });

  it("keeps consent and emergency-stop material educational rather than operational", () => {
    expect(deviceConnectorReadiness.permitted).toEqual(expect.arrayContaining(["consent education", "emergency-stop rehearsal"]));
    expect(deviceConnectorReadiness.stopBoundary).toContain("cannot send a stop command");
  });
});
