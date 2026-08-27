import { describe, expect, it } from "vitest";
import { getMissionStagePosition, isMissionStageId, missionStages } from "./missionFlow";

describe("mission flow", () => {
  it("keeps the guided mission to four ordered, privacy-safe stages", () => {
    expect(missionStages.map((stage) => stage.id)).toEqual(["orient", "media", "practice", "next"]);
    expect(getMissionStagePosition("orient")).toBe(1);
    expect(getMissionStagePosition("next")).toBe(4);
    expect(missionStages.every((stage) => stage.label.length > 0 && stage.hint.length > 0)).toBe(true);
  });

  it("accepts only supported mission stages", () => {
    expect(isMissionStageId("practice")).toBe(true);
    expect(isMissionStageId("payment")).toBe(false);
    expect(isMissionStageId(null)).toBe(false);
  });
});
