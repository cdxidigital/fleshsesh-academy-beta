import { describe, expect, it } from "vitest";
import { buildLessonRewards, shouldIssueCompetencyBadge } from "./rewards";

describe("learning reward and competency fulfilment", () => {
  const starter = { xp: 0, level: 1, currentStreak: 0, longestStreak: 0, lastLearningDay: null };

  it("awards XP once per newly recorded learning step and starts a learning rhythm", () => {
    expect(buildLessonRewards(starter, 35, "2026-08-14")).toMatchObject({ xp: 35, level: 1, currentStreak: 1, longestStreak: 1 });
  });

  it("maintains the streak on the same day and advances it on the next day", () => {
    const sameDay = buildLessonRewards({ ...starter, xp: 35, currentStreak: 1, longestStreak: 1, lastLearningDay: "2026-08-14" }, 35, "2026-08-14");
    const nextDay = buildLessonRewards(sameDay, 35, "2026-08-15");
    expect(sameDay.currentStreak).toBe(1);
    expect(nextDay.currentStreak).toBe(2);
  });

  it("issues a competency badge only when the full unit sequence is complete", () => {
    expect(shouldIssueCompetencyBadge(5, 6)).toBe(false);
    expect(shouldIssueCompetencyBadge(6, 6)).toBe(true);
    expect(shouldIssueCompetencyBadge(6, 0)).toBe(false);
  });
});
