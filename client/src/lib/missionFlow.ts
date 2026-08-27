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

export function buildMissionStagePath({
  courseCode,
  stage,
  facility,
  preview,
}: {
  courseCode: string;
  stage: MissionStageId;
  facility?: string | null;
  preview?: boolean;
}) {
  const params = new URLSearchParams({ course: courseCode, step: stage });
  if (facility) params.set("facility", facility);
  if (preview) params.set("preview", "academy");
  return `/learn/mission?${params.toString()}`;
}
