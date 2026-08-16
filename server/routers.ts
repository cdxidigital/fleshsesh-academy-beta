import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import * as db from "./db";
import { getLecturerResponse, lecturers, type LecturerId } from "./lecturer";
import { learnerProgressStatuses } from "./learningProgress";
import { academyCourses, getCourse } from "@shared/courseCatalog";
import { createCourseCheckout } from "./commerce";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  lecturer: router({
    roster: publicProcedure.query(() => Object.values(lecturers)),
    respond: publicProcedure
      .input(z.object({
        lecturerId: z.enum(["mira", "alex", "rae", "jo", "sam", "amara", "niko", "taylor", "linh", "aria"]),
        message: z.string().trim().min(2).max(900),
        ageConfirmed: z.literal(true),
      }))
      .mutation(async ({ input }) => {
        if (!input.ageConfirmed) {
          throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Adult access confirmation is required." });
        }
        try {
          return await getLecturerResponse({
            lecturerId: input.lecturerId as LecturerId,
            message: input.message,
          });
        } catch (cause) {
          console.error("[lecturer.respond]", cause);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "The lecturer is unavailable right now. Please try again shortly." });
        }
      }),
  }),
  learningProgress: router({
    list: protectedProcedure.query(({ ctx }) => db.listLearnerProgress(ctx.user.id)),
    upsert: protectedProcedure.input(z.object({
      courseCode: z.string().trim().regex(/^FSH\s\d{3}$/),
      progressPercent: z.number().finite().min(0).max(100),
      status: z.enum(learnerProgressStatuses).optional(),
    })).mutation(async ({ ctx, input }) => {
      const enrollment = (await db.listCourseEnrollments(ctx.user.id)).find(item => item.courseCode === input.courseCode && item.status === "active");
      if (!enrollment) throw new TRPCError({ code: "FORBIDDEN", message: "Enrol in this unit before saving learning progress." });
      return db.saveLearnerProgress({ ...input, userId: ctx.user.id });
    }),
  }),
  academy: router({
    catalogue: publicProcedure.query(() => academyCourses),
    myLearning: protectedProcedure.query(async ({ ctx }) => ({
      enrollments: await db.listCourseEnrollments(ctx.user.id),
      completions: await db.listLessonCompletions(ctx.user.id),
      rewards: await db.getLearnerRewards(ctx.user.id),
      badges: await db.listLearnerBadges(ctx.user.id),
    })),
    checkout: protectedProcedure.input(z.object({ courseCode: z.string().trim().regex(/^FSH\s\d{3}$/) })).mutation(async ({ ctx, input }) => {
      if (!getCourse(input.courseCode)) throw new TRPCError({ code: "NOT_FOUND", message: "That learning unit is unavailable." });
      const origin = ctx.req.headers.origin;
      if (!origin) throw new TRPCError({ code: "BAD_REQUEST", message: "A valid platform origin is required for checkout." });
      try {
        return await createCourseCheckout({ userId: ctx.user.id, email: ctx.user.email, name: ctx.user.name, courseCode: input.courseCode, origin });
      } catch (error) {
        console.error("[academy.checkout]", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Checkout is unavailable right now. Please try again shortly." });
      }
    }),
    completeLesson: protectedProcedure.input(z.object({
      courseCode: z.string().trim().regex(/^FSH\s\d{3}$/),
      lessonId: z.string().trim().min(3).max(96),
    })).mutation(async ({ ctx, input }) => {
      const course = getCourse(input.courseCode);
      const enrollment = (await db.listCourseEnrollments(ctx.user.id)).find(item => item.courseCode === input.courseCode && item.status === "active");
      const lesson = course?.modules.find(item => item.id === input.lessonId);
      if (!course || !lesson) throw new TRPCError({ code: "NOT_FOUND", message: "That lesson is unavailable." });
      if (!enrollment) throw new TRPCError({ code: "FORBIDDEN", message: "Enrol in this unit before completing lessons." });
      return db.completeLesson({ userId: ctx.user.id, courseCode: course.code, lessonId: lesson.id, xp: lesson.xp });
    }),
  }),

});

export type AppRouter = typeof appRouter;
