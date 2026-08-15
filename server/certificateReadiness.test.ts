import { describe, expect, it } from "vitest";
import { getCertificateReadiness } from "@shared/certificateReadiness";

const course = { code: "FSH 101", modules: [{ id: "101-a" }, { id: "101-b" }, { id: "101-c" }] };

describe("course-completion recognition readiness", () => {
  it("requires a confirmed active enrolment before any recognition state", () => {
    expect(getCertificateReadiness(course, [], [{ courseCode: "FSH 101", lessonId: "101-a" }, { courseCode: "FSH 101", lessonId: "101-b" }, { courseCode: "FSH 101", lessonId: "101-c" }])).toMatchObject({
      state: "enrolment_required",
      progressPercent: 0,
    });
  });

  it("keeps an enrolled learner in progress until a completion record exists", () => {
    expect(getCertificateReadiness(course, [{ courseCode: "FSH 101", status: "active" }], [{ courseCode: "FSH 101", lessonId: "101-a" }, { courseCode: "FSH 101", lessonId: "101-b" }])).toMatchObject({
      state: "in_progress",
      progressPercent: 67,
    });
  });

  it("recognises only a completed enrolled course and carries no credential-issuing behavior", () => {
    const readiness = getCertificateReadiness(course, [{ courseCode: "FSH 101", status: "active" }], [{ courseCode: "FSH 101", lessonId: "101-a" }, { courseCode: "FSH 101", lessonId: "101-b" }, { courseCode: "FSH 101", lessonId: "101-c" }]);
    expect(readiness).toMatchObject({ state: "recognition_ready", progressPercent: 100 });
    expect(readiness.detail).toContain("not a clinical licence");
  });
});
