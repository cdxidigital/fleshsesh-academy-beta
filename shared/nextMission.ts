export type NextMissionCourse = {
  code: string;
  title: string;
  modules: { id: string; title: string; objective: string }[];
};

type Enrolment = { courseCode: string; status: string };
type Completion = { courseCode: string; lessonId: string };

export type NextMission = {
  courseCode: string;
  courseTitle: string;
  moduleId: string;
  moduleTitle: string;
  objective: string;
  completedCount: number;
  totalCount: number;
};

/**
 * Picks the first unfinished module from an existing active enrolment. It does
 * not persist, infer, or create learner data; catalogue order is the tie-break.
 */
export function getNextMission(courses: NextMissionCourse[], enrolments: Enrolment[], completions: Completion[]): NextMission | null {
  for (const course of courses) {
    if (!enrolments.some((enrolment) => enrolment.courseCode === course.code && enrolment.status === "active")) continue;
    const completedIds = new Set(completions.filter((completion) => completion.courseCode === course.code).map((completion) => completion.lessonId));
    const nextModule = course.modules.find((module) => !completedIds.has(module.id));
    if (!nextModule) continue;
    return {
      courseCode: course.code,
      courseTitle: course.title,
      moduleId: nextModule.id,
      moduleTitle: nextModule.title,
      objective: nextModule.objective,
      completedCount: course.modules.filter((module) => completedIds.has(module.id)).length,
      totalCount: course.modules.length,
    };
  }
  return null;
}
