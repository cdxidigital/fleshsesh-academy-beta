import { describe, expect, it } from "vitest";
import { normalizeRecentlyViewedCourses, recordRecentlyViewedCourse } from "./recentlyViewed";
import { parseRecentlyViewedStorage, parseRecentlyViewedStorageEvent } from "@/hooks/useRecentlyViewedCourses";

describe("browser-local recently viewed courses", () => {
  it("retains only unique, valid course codes within the local thread limit", () => {
    expect(normalizeRecentlyViewedCourses(["FSH 101", "FSH 101", "invalid", 101, "FSH 404"])).toEqual(["FSH 101", "FSH 404"]);
    expect(normalizeRecentlyViewedCourses(["FSH 101", "FSH 102", "FSH 103", "FSH 104", "FSH 105", "FSH 106", "FSH 201"])).toHaveLength(6);
  });

  it("moves a viewed course to the front without creating any learner-account data", () => {
    expect(recordRecentlyViewedCourse(["FSH 101", "FSH 206"], "FSH 206")).toEqual(["FSH 206", "FSH 101"]);
    expect(recordRecentlyViewedCourse(["FSH 101"], "not-a-course")).toEqual(["FSH 101"]);
  });

  it("accepts only the designated local-storage event and normalized course-code payload", () => {
    expect(parseRecentlyViewedStorage('["FSH 101","FSH 101","nope"]')).toEqual(["FSH 101"]);
    expect(parseRecentlyViewedStorage("not-json")).toEqual([]);
    expect(parseRecentlyViewedStorageEvent("unrelated_key", '["FSH 101"]')).toBeNull();
    expect(parseRecentlyViewedStorageEvent("fleshsesh_academy_recently_viewed_v1", '["FSH 206","invalid"]')).toEqual(["FSH 206"]);
  });
});
