import { getCourse } from "./courseCatalog";

type EarnedBadge = { badgeCode: string; sourceCourseCode: string; issuedAt?: Date | null };

export type AchievementArchiveItem = {
  badgeCode: string;
  courseCode: string;
  courseTitle: string;
  label: string;
  boundary: string;
};

export function buildAchievementArchive(badges: EarnedBadge[]): AchievementArchiveItem[] {
  return badges.map((badge) => {
    const course = getCourse(badge.sourceCourseCode);
    return {
      badgeCode: badge.badgeCode,
      courseCode: badge.sourceCourseCode,
      courseTitle: course?.title ?? "Archived learning unit",
      label: badge.badgeCode.replace(/-/g, " "),
      boundary: "Educational completion recognition only — not a professional, clinical, legal, accredited, or regulated credential.",
    };
  });
}
