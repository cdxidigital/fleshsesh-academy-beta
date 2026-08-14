import { int, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const learnerProgress = mysqlTable("learnerProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  courseCode: varchar("courseCode", { length: 32 }).notNull(),
  progressPercent: int("progressPercent").default(0).notNull(),
  status: mysqlEnum("status", ["not_started", "in_progress", "completed"]).default("not_started").notNull(),
  lastOpenedAt: timestamp("lastOpenedAt"),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({
  userCourseUnique: uniqueIndex("learnerProgress_user_course_unique").on(table.userId, table.courseCode),
}));

export type LearnerProgress = typeof learnerProgress.$inferSelect;
export type InsertLearnerProgress = typeof learnerProgress.$inferInsert;

/** Local fulfilment records: course access is business-specific while payment details remain in Stripe. */
export const courseEnrollments = mysqlTable("courseEnrollments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  courseCode: varchar("courseCode", { length: 32 }).notNull(),
  status: mysqlEnum("status", ["pending", "active", "refunded"]).default("pending").notNull(),
  stripeCheckoutSessionId: varchar("stripeCheckoutSessionId", { length: 255 }).unique(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  enrolledAt: timestamp("enrolledAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({
  userCourseUnique: uniqueIndex("courseEnrollments_user_course_unique").on(table.userId, table.courseCode),
}));

/** Records an earned module completion without collecting intimate learner responses. */
export const lessonCompletions = mysqlTable("lessonCompletions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  courseCode: varchar("courseCode", { length: 32 }).notNull(),
  lessonId: varchar("lessonId", { length: 96 }).notNull(),
  xpAwarded: int("xpAwarded").default(0).notNull(),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
}, table => ({
  userLessonUnique: uniqueIndex("lessonCompletions_user_lesson_unique").on(table.userId, table.lessonId),
}));

/** Stores aggregate, non-sensitive reward state used for learner-facing progress feedback. */
export const learnerRewards = mysqlTable("learnerRewards", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
  xp: int("xp").default(0).notNull(),
  level: int("level").default(1).notNull(),
  currentStreak: int("currentStreak").default(0).notNull(),
  longestStreak: int("longestStreak").default(0).notNull(),
  lastLearningDay: varchar("lastLearningDay", { length: 10 }),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/** Competency badges are earned from defined course completion, not engagement manipulation. */
export const learnerBadges = mysqlTable("learnerBadges", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  badgeCode: varchar("badgeCode", { length: 64 }).notNull(),
  sourceCourseCode: varchar("sourceCourseCode", { length: 32 }).notNull(),
  awardedAt: timestamp("awardedAt").defaultNow().notNull(),
}, table => ({
  userBadgeUnique: uniqueIndex("learnerBadges_user_badge_unique").on(table.userId, table.badgeCode),
}));
