import { describe, expect, it } from "vitest";
import { curriculumEndGoal, curriculumPathways, getJourneyStage, getUnitContribution, journeyStages } from "./curriculumJourney";

describe("curriculum journey", () => {
  it("defines the four complete curriculum stages in order", () => {
    expect(journeyStages.map((stage) => stage.level)).toEqual(["101", "201", "301", "401"]);
    expect(journeyStages.every((stage) => stage.purpose && stage.capability && stage.nextStep)).toBe(true);
  });

  it("maps unit levels to a stable learner contribution without credentials claims", () => {
    expect(getJourneyStage("301").title).toBe("Connect evidence, ethics, and action");
    expect(getUnitContribution("201")).toContain("Applied practice");
    expect(curriculumEndGoal.boundary).toMatch(/not a clinical, legal, professional, regulated, or accredited qualification/i);
  });

  it("offers distinct individual learning and deeper-study outcomes without credential claims", () => {
    expect(curriculumPathways.map((pathway) => pathway.id)).toEqual(["personal-learning", "deeper-study"]);
    expect(curriculumPathways[0].boundary).toMatch(/do not need to continue into 301 or 401/i);
    expect(curriculumPathways[1].boundary).toMatch(/not a licence, accreditation/i);
  });
});
