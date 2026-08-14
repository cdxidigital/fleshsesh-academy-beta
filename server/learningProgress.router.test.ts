import { beforeEach, describe, expect, it, vi } from "vitest";

const { listCourseEnrollments, listLearnerProgress, saveLearnerProgress } = vi.hoisted(() => ({
  listCourseEnrollments: vi.fn(),
  listLearnerProgress: vi.fn(),
  saveLearnerProgress: vi.fn(),
}));

vi.mock("./db", () => ({ listCourseEnrollments, listLearnerProgress, saveLearnerProgress }));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createAuthenticatedContext(): TrpcContext {
  return {
    user: {
      id: 42,
      openId: "member-test-user",
      name: "Member Test",
      email: "member@example.com",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("learningProgress router", () => {
  beforeEach(() => vi.clearAllMocks());

  it("loads the authenticated member’s course records", async () => {
    listLearnerProgress.mockResolvedValue([{ courseCode: "FSH 101", progressPercent: 10, status: "in_progress" }]);
    const caller = appRouter.createCaller(createAuthenticatedContext());

    await expect(caller.learningProgress.list()).resolves.toEqual([{ courseCode: "FSH 101", progressPercent: 10, status: "in_progress" }]);
    expect(listLearnerProgress).toHaveBeenCalledWith(42);
  });

  it("saves an authenticated member’s course step", async () => {
    listCourseEnrollments.mockResolvedValue([{ courseCode: "FSH 206", status: "active" }]);
    saveLearnerProgress.mockResolvedValue({ courseCode: "FSH 206", progressPercent: 10, status: "in_progress" });
    const caller = appRouter.createCaller(createAuthenticatedContext());

    await expect(caller.learningProgress.upsert({ courseCode: "FSH 206", progressPercent: 10, status: "in_progress" })).resolves.toMatchObject({ courseCode: "FSH 206" });
    expect(saveLearnerProgress).toHaveBeenCalledWith({ userId: 42, courseCode: "FSH 206", progressPercent: 10, status: "in_progress" });
  });

  it("rejects progress writes for a course without active enrolment", async () => {
    listCourseEnrollments.mockResolvedValue([]);
    const caller = appRouter.createCaller(createAuthenticatedContext());

    await expect(caller.learningProgress.upsert({ courseCode: "FSH 206", progressPercent: 10 })).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(saveLearnerProgress).not.toHaveBeenCalled();
  });
});
