import { describe, expect, it } from "vitest";
import { campusFacilities } from "@shared/campusFacilities";
import { courseByCode } from "@shared/courseCatalog";

describe("campus facility rooms", () => {
  it("gives every facility a non-disclosive studio, faculty handoff, and mapped learning path", () => {
    expect(campusFacilities).toHaveLength(4);

    for (const facility of campusFacilities) {
      expect(facility.room.studioName.length).toBeGreaterThan(3);
      expect(facility.room.learningModes).toHaveLength(3);
      expect(facility.room.reflectionPrompts).toHaveLength(3);
      expect(facility.room.faculty.name.length).toBeGreaterThan(3);
      expect(facility.room.faculty.handoff.length).toBeGreaterThan(24);
      expect(facility.courseCodes.every((code) => courseByCode.has(code))).toBe(true);
    }
  });
});
