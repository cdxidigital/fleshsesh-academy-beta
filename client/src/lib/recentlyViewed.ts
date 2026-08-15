export const recentlyViewedStorageKey = "fleshsesh_academy_recently_viewed_v1";
export const recentlyViewedCourseLimit = 6;

const isCourseCode = (value: unknown): value is string => typeof value === "string" && /^FSH\s\d{3}$/.test(value);

export function normalizeRecentlyViewedCourses(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.filter(isCourseCode))).slice(0, recentlyViewedCourseLimit);
}

export function recordRecentlyViewedCourse(currentCodes: string[], courseCode: string): string[] {
  const normalized = normalizeRecentlyViewedCourses(currentCodes);
  if (!isCourseCode(courseCode)) return normalized;
  return [courseCode, ...normalized.filter((code) => code !== courseCode)].slice(0, recentlyViewedCourseLimit);
}
