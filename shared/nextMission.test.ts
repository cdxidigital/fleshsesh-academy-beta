import { describe, expect, it } from "vitest";
import { getNextMission } from "./nextMission";

const courses = [
  { code: "FSH 101", title: "Body Literacy", modules: [{ id: "101-a", title: "First idea", objective: "Understand the first concept." }, { id: "101-b", title: "Second idea", objective: "Understand the next concept." }] },
  { code: "FSH 201", title: "Applied Learning", modules: [{ id: "201-a", title: "Applied idea", objective: "Apply the concept." }] },
];

describe("getNextMission", () => {
  it("returns the first unfinished module from an existing active enrolment", () => {
    expect(getNextMission(courses, [{ courseCode: "FSH 101", status: "active" }], [{ courseCode: "FSH 101", lessonId: "101-a" }])).toMatchObject({
      courseCode: "FSH 101", moduleId: "101-b", completedCount: 1, totalCount: 2,
    });
  });

  it("skips complete, inactive, and unavailable enrolments without fabricating a next mission", () => {
    expect(getNextMission(courses, [{ courseCode: "FSH 101", status: "active" }, { courseCode: "FSH 201", status: "cancelled" }], [{ courseCode: "FSH 101", lessonId: "101-a" }, { courseCode: "FSH 101", lessonId: "101-b" }])).toBeNull();
  });
});
