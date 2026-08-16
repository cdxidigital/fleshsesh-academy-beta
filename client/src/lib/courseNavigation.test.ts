import { describe, expect, it } from "vitest";
import { getAdjacentCourses } from "./courseNavigation";

const courses = [
  { code: "FSH 101", title: "Body Literacy" },
  { code: "FSH 102", title: "Consent" },
  { code: "FSH 103", title: "Health" },
];

describe("getAdjacentCourses", () => {
  it("returns the neighbouring units within the provided course collection", () => {
    expect(getAdjacentCourses(courses, "FSH 102")).toMatchObject({
      selectedIndex: 1,
      previous: courses[0],
      next: courses[2],
    });
  });

  it("keeps pathway boundaries intact at the first and final units", () => {
    expect(getAdjacentCourses(courses, "FSH 101")).toMatchObject({ previous: null, next: courses[1] });
    expect(getAdjacentCourses(courses, "FSH 103")).toMatchObject({ previous: courses[1], next: null });
  });

  it("does not infer a neighbour when the selected code is absent", () => {
    expect(getAdjacentCourses(courses, "FSH 404")).toEqual({ selectedIndex: -1, previous: null, next: null });
  });
});
