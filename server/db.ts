import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, learnerProgress, users } from "../drizzle/schema";
import { normalizeLearnerProgress, type LearnerProgressStatus } from "./learningProgress";
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
