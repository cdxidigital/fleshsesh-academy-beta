import { describe, expect, it } from "vitest";
import { aiGuidanceRoles } from "./aiGuidanceRoles";

describe("AI guidance roles", () => {
  it("provides exactly four clear entry roles with a safety boundary", () => {
    expect(aiGuidanceRoles).toHaveLength(4);
    expect(aiGuidanceRoles.map((role) => role.id)).toEqual([
      "tutor",
      "student-services",
      "health-advisor",
      "special-guests",
    ]);
    expect(aiGuidanceRoles.every((role) => role.boundary.length > 20)).toBe(true);
  });

  it("routes student services to its dedicated bounded AI persona", () => {
    expect(aiGuidanceRoles.find((role) => role.id === "student-services")?.lecturerId).toBe("aria");
  });
});
