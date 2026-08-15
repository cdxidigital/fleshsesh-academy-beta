import { describe, expect, it } from "vitest";
import { buildAchievementArchive } from "@shared/achievementArchive";

describe("achievement archive", () => {
  it("maps an existing badge to its source course without issuing a new credential", () => {
    const [item] = buildAchievementArchive([{ badgeCode: "body-literacy", sourceCourseCode: "FSH 101" }]);
    expect(item).toMatchObject({ courseCode: "FSH 101", courseTitle: "Body Literacy", label: "body literacy" });
    expect(item.boundary).toContain("not a professional");
  });

  it("keeps an unknown historical badge read-only and safely labelled", () => {
    const [item] = buildAchievementArchive([{ badgeCode: "legacy-badge", sourceCourseCode: "FSH 999" }]);
    expect(item.courseTitle).toBe("Archived learning unit");
  });
});
