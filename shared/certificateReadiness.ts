export type CertificateReadiness = {
  courseCode: string;
  state: "enrolment_required" | "in_progress" | "recognition_ready";
  progressPercent: number;
  title: string;
  detail: string;
};

type Enrolment = { courseCode: string; status: string };
type Completion = { courseCode: string; lessonId: string };
type CourseStructure = { code: string; modules: { id: string }[] };

export function getCertificateReadiness(course: CourseStructure, enrolments: Enrolment[], completions: Completion[]): CertificateReadiness {
  const enrolled = enrolments.some((enrolment) => enrolment.courseCode === course.code && enrolment.status === "active");
  const completedLessons = new Set(completions.filter((completion) => completion.courseCode === course.code).map((completion) => completion.lessonId));
  const completedCount = course.modules.filter((module) => completedLessons.has(module.id)).length;
  const progressPercent = course.modules.length ? Math.round((completedCount / course.modules.length) * 100) : 0;

  if (!enrolled) return {
    courseCode: course.code,
    state: "enrolment_required",
    progressPercent: 0,
    title: "Enrolment required",
    detail: "Course-completion recognition is available only after confirmed enrolment and recorded learning completion.",
  };

  if (course.modules.length > 0 && completedCount === course.modules.length) return {
    courseCode: course.code,
    state: "recognition_ready",
    progressPercent: 100,
    title: "Course completion recognised",
    detail: "Your completed learning record is ready for course-completion recognition. This is not a clinical licence, legal credential, professional accreditation, or qualification.",
  };

  return {
    courseCode: course.code,
    state: "in_progress",
    progressPercent,
    title: "Learning in progress",
    detail: "Finish the guided learning sequence and recorded knowledge checks to reach course-completion recognition.",
  };
}
