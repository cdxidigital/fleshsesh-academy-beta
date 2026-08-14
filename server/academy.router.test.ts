import { beforeEach, describe, expect, it, vi } from "vitest";

const { completeLesson, createCourseCheckout, listCourseEnrollments } = vi.hoisted(() => ({
  completeLesson: vi.fn(),
  createCourseCheckout: vi.fn(),
  listCourseEnrollments: vi.fn(),
}));

vi.mock("./db", () => ({
  completeLesson,
  listCourseEnrollments,
  listLearnerBadges: vi.fn(),
  listLearnerProgress: vi.fn(),
  getLearnerRewards: vi.fn(),
  listLessonCompletions: vi.fn(),
}));

vi.mock("./commerce", () => ({ createCourseCheckout }));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createAuthenticatedContext(): TrpcContext {
  return {
    user: { id: 24, openId: "learner-24", name: "Learner Test", email: "learner@example.com", loginMethod: "manus", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: { protocol: "https", headers: { origin: "https://academy.example" } } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("academy paid-learning router", () => {
  beforeEach(() => vi.clearAllMocks());

  it("creates a checkout handoff tied to the authenticated learner", async () => {
    createCourseCheckout.mockResolvedValue({ url: "https://checkout.stripe.example/session" });
    const caller = appRouter.createCaller(createAuthenticatedContext());
    await expect(caller.academy.checkout({ courseCode: "FSH 101" })).resolves.toEqual({ url: "https://checkout.stripe.example/session" });
    expect(createCourseCheckout).toHaveBeenCalledWith(expect.objectContaining({ userId: 24, courseCode: "FSH 101", origin: "https://academy.example" }));
  });

  it("prevents lesson completion until the learner has active course enrolment", async () => {
    listCourseEnrollments.mockResolvedValue([]);
    const caller = appRouter.createCaller(createAuthenticatedContext());
    await expect(caller.academy.completeLesson({ courseCode: "FSH 101", lessonId: "fsh-101-m1" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(completeLesson).not.toHaveBeenCalled();
  });

  it("records an enrolled learner’s lesson completion with the module XP reward", async () => {
    listCourseEnrollments.mockResolvedValue([{ courseCode: "FSH 101", status: "active" }]);
    completeLesson.mockResolvedValue({ alreadyCompleted: false, rewards: { xp: 35, level: 1, currentStreak: 1 } });
    const caller = appRouter.createCaller(createAuthenticatedContext());
    await expect(caller.academy.completeLesson({ courseCode: "FSH 101", lessonId: "fsh-101-m1" })).resolves.toMatchObject({ alreadyCompleted: false });
    expect(completeLesson).toHaveBeenCalledWith({ userId: 24, courseCode: "FSH 101", lessonId: "fsh-101-m1", xp: 35 });
  });

  it("keeps a repeated learning step reward-safe and surfaces the existing completion", async () => {
    listCourseEnrollments.mockResolvedValue([{ courseCode: "FSH 101", status: "active" }]);
    completeLesson.mockResolvedValue({ alreadyCompleted: true, rewards: { xp: 35, level: 1, currentStreak: 1 }, badge: { code: "body-literacy" } });
    const caller = appRouter.createCaller(createAuthenticatedContext());
    await expect(caller.academy.completeLesson({ courseCode: "FSH 101", lessonId: "fsh-101-m1" })).resolves.toMatchObject({ alreadyCompleted: true, badge: { code: "body-literacy" } });
    expect(completeLesson).toHaveBeenCalledTimes(1);
  });
});
