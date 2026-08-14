import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import * as db from "./db";
import { getLecturerResponse, lecturers, type LecturerId } from "./lecturer";
import { learnerProgressStatuses } from "./learningProgress";
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
        lecturerId: z.enum(["mira", "alex", "rae", "jo", "sam", "amara", "niko", "taylor", "linh"]),
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
    })).mutation(({ ctx, input }) => db.saveLearnerProgress({ ...input, userId: ctx.user.id })),
  }),

});

export type AppRouter = typeof appRouter;
