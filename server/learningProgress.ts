export const learnerProgressStatuses = ["not_started", "in_progress", "completed"] as const;
export type LearnerProgressStatus = (typeof learnerProgressStatuses)[number];

export function normalizeLearnerProgress(progressPercent: number, requestedStatus?: LearnerProgressStatus) {
  const normalizedPercent = Math.min(100, Math.max(0, Math.round(progressPercent)));
  const status: LearnerProgressStatus = requestedStatus ?? (normalizedPercent >= 100 ? "completed" : normalizedPercent > 0 ? "in_progress" : "not_started");
  const finalPercent = status === "completed" ? 100 : normalizedPercent;
  return { progressPercent: finalPercent, status };
}
