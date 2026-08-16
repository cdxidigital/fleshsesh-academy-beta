import { describe, expect, it } from "vitest";
import { filterAtlasCourses } from "./courseFilter";

const courses = [
  { code: "FSH 101", level: "101", title: "Body Literacy", subtitle: "Human anatomy", learningOutcome: "Understand anatomy" },
  { code: "FSH 206", level: "201", title: "Digital Intimacy", subtitle: "Privacy and safety", learningOutcome: "Plan safer digital choices" },
  { code: "FSH 304", level: "301", title: "Sexual Rights", subtitle: "Ethics and power", learningOutcome: "Analyse rights contexts" },
];

describe("filterAtlasCourses", () => {
  it("filters by level without creating or mutating course records", () => {
    expect(filterAtlasCourses(courses, { level: "201", query: "", topic: "all" })).toEqual([courses[1]]);
    expect(courses).toHaveLength(3);
  });

  it("finds a course across its code, title, subtitle, or learning outcome", () => {
    expect(filterAtlasCourses(courses, { level: "all", query: "privacy", topic: "all" })).toEqual([courses[1]]);
    expect(filterAtlasCourses(courses, { level: "all", query: "FSH 304", topic: "all" })).toEqual([courses[2]]);
  });

  it("combines level and query criteria while returning an empty result when nothing matches", () => {
    expect(filterAtlasCourses(courses, { level: "301", query: "rights", topic: "relationships" })).toEqual([courses[2]]);
    expect(filterAtlasCourses(courses, { level: "101", query: "privacy", topic: "all" })).toEqual([]);
  });

  it("filters by an explicit curriculum topic without using learner data", () => {
    expect(filterAtlasCourses(courses, { level: "all", query: "", topic: "digital" })).toEqual([courses[1], courses[2]]);
    expect(filterAtlasCourses(courses, { level: "101", query: "", topic: "digital" })).toEqual([]);
  });
});
