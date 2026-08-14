import { describe, expect, it } from "vitest";
import { normalizeLearnerProgress } from "./learningProgress";

describe("learner progress normalization", () => {
  it("clamps course progress to the supported range", () => {
    expect(normalizeLearnerProgress(-10)).toEqual({ progressPercent: 0, status: "not_started" });
    expect(normalizeLearnerProgress(160)).toEqual({ progressPercent: 100, status: "completed" });
  });

  it("uses an in-progress status once a learner starts a course", () => {
    expect(normalizeLearnerProgress(25)).toEqual({ progressPercent: 25, status: "in_progress" });
  });

  it("treats an explicit completion action as a completed course", () => {
    expect(normalizeLearnerProgress(60, "completed")).toEqual({ progressPercent: 100, status: "completed" });
  });
});
