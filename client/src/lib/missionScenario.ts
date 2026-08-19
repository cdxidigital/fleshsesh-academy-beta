export type MissionScenarioInput = {
  title: string;
  objective: string;
};

export type MissionScenario = {
  setup: string;
  prompt: string;
  safeNextStep: string;
};

/** Creates a fictional, non-submittable reflection prompt for the public mission. */
export function createMissionScenario({ title, objective }: MissionScenarioInput): MissionScenario {
  return {
    setup: `A fictional adult learner comes across an unfamiliar claim about ${title.toLowerCase()}. They pause before assuming it applies to their own situation.`,
    prompt: `Using this learning objective — “${objective}” — what is one general question they could take to a reliable educational or qualified support source?`,
    safeNextStep: "Keep the question general. This mission does not ask for, collect, or submit a personal response.",
  };
}
