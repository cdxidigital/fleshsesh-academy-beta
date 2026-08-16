export type FilterableCourse = {
  code: string;
  level: string;
  title: string;
  subtitle: string;
  learningOutcome: string;
};

export type AtlasFilter = {
  level: string;
  query: string;
  topic: AtlasTopic;
};

export const atlasTopics = ["all", "care", "consent", "relationships", "digital"] as const;
export type AtlasTopic = typeof atlasTopics[number];

export const atlasTopicLabels: Record<AtlasTopic, string> = {
  all: "All subjects",
  care: "Care navigation",
  consent: "Consent & communication",
  relationships: "Relationships & inclusion",
  digital: "Digital privacy",
};

const courseTopics: Record<string, Exclude<AtlasTopic, "all">[]> = {
  "FSH 101": ["care"],
  "FSH 102": ["consent"],
  "FSH 103": ["care"],
  "FSH 104": ["relationships"],
  "FSH 105": ["care"],
  "FSH 201": ["care"],
  "FSH 202": ["care"],
  "FSH 203": ["consent", "relationships"],
  "FSH 204": ["consent", "relationships"],
  "FSH 205": ["care", "relationships"],
  "FSH 206": ["digital"],
  "FSH 207": ["care", "relationships"],
  "FSH 301": ["care"],
  "FSH 302": ["consent", "relationships"],
  "FSH 303": ["consent"],
  "FSH 304": ["consent", "relationships", "digital"],
  "FSH 305": ["care", "consent"],
  "FSH 401": ["care", "relationships"],
  "FSH 402": ["consent", "relationships"],
  "FSH 403": ["care", "digital"],
  "FSH 404": ["care", "consent", "relationships"],
};

export function filterAtlasCourses<T extends FilterableCourse>(courses: T[], filter: AtlasFilter): T[] {
  const normalizedQuery = filter.query.trim().toLowerCase();

  return courses.filter((course) => {
    const matchesLevel = filter.level === "all" || course.level === filter.level;
    if (!matchesLevel) return false;
    const matchesTopic = filter.topic === "all" || courseTopics[course.code]?.includes(filter.topic);
    if (!matchesTopic) return false;
    if (!normalizedQuery) return true;
    return [course.code, course.title, course.subtitle, course.learningOutcome]
      .some((value) => value.toLowerCase().includes(normalizedQuery));
  });
}
