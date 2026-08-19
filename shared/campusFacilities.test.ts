import { campusFacilities, campusPathway } from "./campusFacilities";

describe("guided campus places", () => {
  it("uses a clear three-place sequence", () => {
    expect(campusFacilities.map((place) => place.id)).toEqual(["classroom", "student-services", "auditorium"]);
    expect(campusPathway.map((step) => step.step)).toEqual(["01", "02", "03"]);
  });

  it("gives each background support place a bounded guide and a first mission", () => {
    campusFacilities.forEach((place) => {
      expect(place.courseCodes.length).toBeGreaterThan(0);
      expect(place.pathway.action).toBeTruthy();
      expect(place.room.faculty.handoff).toMatch(/not|cannot|directs|qualified support/i);
    });
  });
});
