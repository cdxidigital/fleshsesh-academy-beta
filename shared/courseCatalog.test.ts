import { describe, expect, it } from "vitest";
import { academyCourses, getCourse } from "./courseCatalog";

describe("academy course catalogue", () => {
  it("contains the complete 21-unit curriculum across all four levels", () => {
    expect(academyCourses).toHaveLength(21);
    expect(new Set(academyCourses.map(course => course.level))).toEqual(new Set(["101", "201", "301", "401"]));
  });

  it("gives every paid unit a complete learning sequence and competency marker", () => {
    academyCourses.forEach(course => {
      expect(course.priceCents).toBeGreaterThan(0);
      expect(course.badgeCode).toBeTruthy();
      expect(course.modules.length).toBeGreaterThanOrEqual(6);
      expect(course.modules.every(module => module.summary && module.practice && module.check && module.xp > 0)).toBe(true);
    });
  });

  it("resolves individual courses by their public class code", () => {
    expect(getCourse("FSH 302")?.title).toBe("Kink Education, Negotiation & Safety");
    expect(getCourse("FSH 999")).toBeUndefined();
  });
});
