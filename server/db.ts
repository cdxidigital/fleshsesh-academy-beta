import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { courseEnrollments, InsertUser, learnerBadges, learnerProgress, learnerRewards, lessonCompletions, users } from "../drizzle/schema";
import { getCourse } from "@shared/courseCatalog";
import { normalizeLearnerProgress, type LearnerProgressStatus } from "./learningProgress";
import { buildLessonRewards, shouldIssueCompetencyBadge } from "./rewards";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function listLearnerProgress(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.select().from(learnerProgress).where(eq(learnerProgress.userId, userId));
}

export async function saveLearnerProgress(input: { userId: number; courseCode: string; progressPercent: number; status?: LearnerProgressStatus }) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const normalized = normalizeLearnerProgress(input.progressPercent, input.status);
  const now = new Date();
  const completedAt = normalized.status === "completed" ? now : null;
  await db.insert(learnerProgress).values({
    userId: input.userId,
    courseCode: input.courseCode,
    progressPercent: normalized.progressPercent,
    status: normalized.status,
    lastOpenedAt: now,
    completedAt,
  }).onDuplicateKeyUpdate({
    set: { progressPercent: normalized.progressPercent, status: normalized.status, lastOpenedAt: now, completedAt },
  });
  const result = await db.select().from(learnerProgress).where(and(eq(learnerProgress.userId, input.userId), eq(learnerProgress.courseCode, input.courseCode))).limit(1);
  return result[0];
}

export async function listCourseEnrollments(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.select().from(courseEnrollments).where(eq(courseEnrollments.userId, userId));
}

export async function recordPendingEnrollment(input: { userId: number; courseCode: string; stripeCheckoutSessionId: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  await db.insert(courseEnrollments).values({ ...input, status: "pending" }).onDuplicateKeyUpdate({ set: { status: "pending", stripeCheckoutSessionId: input.stripeCheckoutSessionId } });
}

export async function activateCourseEnrollment(input: { userId: number; courseCode: string; stripeCheckoutSessionId: string; stripePaymentIntentId?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const now = new Date();
  await db.insert(courseEnrollments).values({ ...input, status: "active", enrolledAt: now }).onDuplicateKeyUpdate({ set: { status: "active", stripeCheckoutSessionId: input.stripeCheckoutSessionId, stripePaymentIntentId: input.stripePaymentIntentId, enrolledAt: now } });
}

export async function listLessonCompletions(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.select().from(lessonCompletions).where(eq(lessonCompletions.userId, userId));
}

export async function getLearnerRewards(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const result = await db.select().from(learnerRewards).where(eq(learnerRewards.userId, userId)).limit(1);
  return result[0] ?? { userId, xp: 0, level: 1, currentStreak: 0, longestStreak: 0, lastLearningDay: null };
}

export async function listLearnerBadges(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.select().from(learnerBadges).where(eq(learnerBadges.userId, userId));
}

function isoDay(date = new Date()) { return date.toISOString().slice(0, 10); }

export async function completeLesson(input: { userId: number; courseCode: string; lessonId: string; xp: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const existing = await db.select().from(lessonCompletions).where(and(eq(lessonCompletions.userId, input.userId), eq(lessonCompletions.lessonId, input.lessonId))).limit(1);
  if (existing[0]) return { completion: existing[0], alreadyCompleted: true, rewards: await getLearnerRewards(input.userId) };
  const now = new Date();
  await db.insert(lessonCompletions).values({ ...input, xpAwarded: input.xp, completedAt: now });
  const current = await getLearnerRewards(input.userId);
  const today = isoDay(now);
  const rewards = buildLessonRewards(current, input.xp, today);
  await db.insert(learnerRewards).values({ userId: input.userId, ...rewards }).onDuplicateKeyUpdate({ set: rewards });
  const course = getCourse(input.courseCode);
  const completions = await db.select().from(lessonCompletions).where(and(eq(lessonCompletions.userId, input.userId), eq(lessonCompletions.courseCode, input.courseCode)));
  if (course && shouldIssueCompetencyBadge(completions.length, course.modules.length)) {
    await db.insert(learnerBadges).values({ userId: input.userId, badgeCode: course.badgeCode, sourceCourseCode: course.code }).onDuplicateKeyUpdate({ set: { sourceCourseCode: course.code } });
    await saveLearnerProgress({ userId: input.userId, courseCode: course.code, progressPercent: 100, status: "completed" });
  } else if (course) {
    await saveLearnerProgress({ userId: input.userId, courseCode: course.code, progressPercent: Math.round((completions.length / course.modules.length) * 100) });
  }
  return { completion: { ...input, completedAt: now }, alreadyCompleted: false, rewards };
}
