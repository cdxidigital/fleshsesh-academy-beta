import { describe, expect, it } from "vitest";
import { createMissionScenario } from "./missionScenario";

describe("createMissionScenario", () => {
  it("creates a fictional, non-submittable prompt tied to the selected learning objective", () => {
    const scenario = createMissionScenario({ title: "Consent principles", objective: "Explain consent principles in clear language." });
    expect(scenario.setup).toContain("fictional adult learner");
    expect(scenario.prompt).toContain("Explain consent principles in clear language.");
    expect(scenario.safeNextStep).toContain("does not ask for, collect, or submit");
  });
});
