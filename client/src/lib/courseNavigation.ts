export type CourseNavigationItem = {
  code: string;
};

export function getAdjacentCourses<T extends CourseNavigationItem>(courses: T[], selectedCode: string | null) {
  const selectedIndex = courses.findIndex((course) => course.code === selectedCode);

  return {
    selectedIndex,
    previous: selectedIndex > 0 ? courses[selectedIndex - 1] : null,
    next: selectedIndex >= 0 && selectedIndex < courses.length - 1 ? courses[selectedIndex + 1] : null,
  };
}
