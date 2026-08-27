export const missionStages = [
  { id: "orient", label: "Orient", hint: "Know the goal." },
  { id: "media", label: "See or listen", hint: "Use media if useful." },
  { id: "practice", label: "Try", hint: "Make one private move." },
  { id: "next", label: "Choose next", hint: "Pause or continue." },
] as const;

export type MissionStageId = (typeof missionStages)[number]["id"];

export function isMissionStageId(value: string | null): value is MissionStageId {
  return missionStages.some((stage) => stage.id === value);
}

export function getMissionStagePosition(stageId: MissionStageId) {
  return missionStages.findIndex((stage) => stage.id === stageId) + 1;
}
