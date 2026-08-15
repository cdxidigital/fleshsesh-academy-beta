import { describe, expect, it } from "vitest";
import { normalizeSyllabusShelf, toggleSyllabusCourse } from "./syllabusShelf";
import { parseSyllabusShelfStorage } from "@/hooks/useSyllabusShelf";

describe("browser-local syllabus shelf", () => {
  it("retains only unique, valid course codes", () => {
    expect(normalizeSyllabusShelf(["FSH 101", "FSH 101", "invalid", 101, "FSH 404"])).toEqual(["FSH 101", "FSH 404"]);
  });

  it("adds and removes a course code without producing learner-account data", () => {
    expect(toggleSyllabusCourse([], "FSH 206")).toEqual(["FSH 206"]);
    expect(toggleSyllabusCourse(["FSH 206"], "FSH 206")).toEqual([]);
  });

  it("normalizes valid external browser-storage payloads and rejects malformed values", () => {
    expect(parseSyllabusShelfStorage('["FSH 101","FSH 101","nope"]')).toEqual(["FSH 101"]);
    expect(parseSyllabusShelfStorage("not-json")).toEqual([]);
  });
});
