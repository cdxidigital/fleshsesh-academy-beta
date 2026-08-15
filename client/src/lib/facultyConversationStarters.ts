export type FacultyConversationStarter = {
  id: "overview" | "scenario" | "source-check";
  label: string;
  prompt: string;
};

export function buildFacultyConversationStarters(focus: string): FacultyConversationStarter[] {
  return [
    {
      id: "overview",
      label: "Explain the foundations",
      prompt: `Give a clear, general introduction to ${focus} for an adult learner. Keep the explanation educational and do not ask for personal details.`,
    },
    {
      id: "scenario",
      label: "Use a fictional scenario",
      prompt: `Use a fictional, non-personal scenario to show how the core ideas in ${focus} can be applied respectfully. Do not ask me to share my own experience.`,
    },
    {
      id: "source-check",
      label: "Build a source-check lens",
      prompt: `Give a short, general checklist for assessing information about ${focus}. Keep it educational and identify when a qualified human professional is the right next step.`,
    },
  ];
}
