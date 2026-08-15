import { describe, expect, it } from "vitest";
import { normalizeSyllabusShelf, toggleSyllabusCourse } from "./syllabusShelf";
import { parseSyllabusShelfStorage, parseSyllabusShelfStorageEvent } from "@/hooks/useSyllabusShelf";

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

  it("accepts only shelf storage events and normalizes their course-code payload", () => {
    expect(parseSyllabusShelfStorageEvent("unrelated_key", '["FSH 101"]')).toBeNull();
    expect(parseSyllabusShelfStorageEvent("fleshsesh_academy_syllabus_shelf_v1", '["FSH 206","invalid"]')).toEqual(["FSH 206"]);
  });
});
