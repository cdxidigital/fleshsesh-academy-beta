export const aiGuidanceRoles = [
  {
    id: "tutor",
    step: "A",
    label: "AI tutor",
    heading: "Learn the unit",
    description: "Get plain-language help with course concepts, study moves, source checks, and scenario preparation.",
    boundary: "Education only — no personal assessment or diagnosis.",
    lecturerId: "linh",
    action: "Ask a tutor",
  },
  {
    id: "student-services",
    step: "B",
    label: "Student services",
    heading: "Find your way",
    description: "Understand where to start, how the course journey works, and the difference between saving, enrolling, and studying.",
    boundary: "General platform guidance only — no account, payment, or identity access.",
    lecturerId: "aria",
    action: "Ask student services",
  },
  {
    id: "health-advisor",
    step: "C",
    label: "Health advisor",
    heading: "Build health literacy",
    description: "Explore general evidence, care-navigation questions, and how to prepare for a qualified professional conversation.",
    boundary: "Not diagnosis, treatment, crisis, or urgent-care advice.",
    lecturerId: "mira",
    action: "Ask the health advisor",
  },
  {
    id: "special-guests",
    step: "D",
    label: "Special guests",
    heading: "Hear a focused perspective",
    description: "Meet rotating faculty viewpoints on topics such as digital safety, relationships, inclusion, and consent practice.",
    boundary: "General adult education only — no personal disclosure needed.",
    lecturerId: "sam",
    action: "Meet a special guest",
  },
] as const;

export type AiGuidanceRole = (typeof aiGuidanceRoles)[number];
