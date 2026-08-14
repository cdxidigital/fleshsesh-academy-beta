export type LearnerRewardSnapshot = {
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastLearningDay: string | null;
};

function daysBetween(from: string, to: string) {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
}

export function buildLessonRewards(current: LearnerRewardSnapshot, xpAwarded: number, learningDay: string): LearnerRewardSnapshot {
  const gap = current.lastLearningDay ? daysBetween(current.lastLearningDay, learningDay) : null;
  const currentStreak = gap === 0 ? current.currentStreak : gap === 1 ? current.currentStreak + 1 : 1;
  const xp = current.xp + xpAwarded;
  return { xp, level: Math.floor(xp / 250) + 1, currentStreak, longestStreak: Math.max(current.longestStreak, currentStreak), lastLearningDay: learningDay };
}

export function shouldIssueCompetencyBadge(completionCount: number, moduleCount: number) {
  return moduleCount > 0 && completionCount >= moduleCount;
}
