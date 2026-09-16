import type { CourseLevel } from "./courseCatalog";

export const academyUnitPriceCents: Record<CourseLevel, number> = {
  "101": 5900,
  "201": 7900,
  "301": 9900,
  "401": 12900,
};

export const academyPricing = {
  free: {
    code: "first-look",
    name: "First Look",
    priceCents: 0,
    description: "One complete sample mission with no account required.",
  },
  units: [
    { level: "101" as CourseLevel, name: "Foundations", priceCents: 5900 },
    { level: "201" as CourseLevel, name: "Everyday Practice", priceCents: 7900 },
    { level: "301" as CourseLevel, name: "Deeper Study", priceCents: 9900 },
    { level: "401" as CourseLevel, name: "Advanced Portfolio", priceCents: 12900 },
  ],
  futurePasses: [
    { code: "foundations-pass", name: "Foundations Pass", priceCents: 19900, includes: "All 101 units", status: "coming-soon" },
    { code: "everyday-pass", name: "Everyday Pass", priceCents: 39900, includes: "All 201 units", status: "coming-soon" },
    { code: "deep-study-pass", name: "Deep Study Pass", priceCents: 39900, includes: "All 301 units", status: "coming-soon" },
    { code: "full-academy-pass", name: "Full Academy Pass", priceCents: 89900, includes: "101–401 catalogue", status: "coming-soon" },
  ],
} as const;

export function getAcademyUnitPriceCents(level: CourseLevel) {
  return academyUnitPriceCents[level];
}
