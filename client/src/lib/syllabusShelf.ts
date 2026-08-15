export const syllabusShelfStorageKey = "fleshsesh_academy_syllabus_shelf_v1";

export function normalizeSyllabusShelf(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.filter((code): code is string => typeof code === "string" && /^FSH\s\d{3}$/.test(code))));
}

export function toggleSyllabusCourse(currentCodes: string[], courseCode: string): string[] {
  const codes = normalizeSyllabusShelf(currentCodes);
  return codes.includes(courseCode) ? codes.filter((code) => code !== courseCode) : [...codes, courseCode];
}
