import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { ROLES } from "~/lib/auth/roles";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  const role = (ctx.session.user as { role?: string }).role;
  if (role !== ROLES.ADMIN && role !== ROLES.AMBASSADOR) {
    throw new Error("Unauthorized");
  }
  return next({ ctx });
});

export const adminRouter = createTRPCRouter({
  listUsers: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        engagementScore: true,
      },
      orderBy: { id: "desc" },
      take: 100,
    });
  }),

  listAnnouncements: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.announcement.findMany({
      include: { author: { select: { name: true, email: true } } },
      orderBy: { id: "desc" },
      take: 50,
    });
  }),

  createAnnouncement: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        body: z.string().optional(),
        zone: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.announcement.create({
        data: {
          authorId: ctx.session.user.id,
          title: input.title,
          body: input.body ?? null,
          zone: input.zone ?? null,
          publishedAt: new Date(),
        },
      });
    }),

  createNoticeboardPost: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        body: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.noticeboardPost.create({
        data: {
          title: input.title,
          body: input.body ?? null,
        },
      });
    }),

  listChallenges: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.challenge.findMany({
      orderBy: { startDate: "desc" },
      take: 50,
      include: {
        _count: { select: { participations: true } },
      },
    });
  }),

  createChallenge: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        status: z.enum(["Upcoming", "Active", "Ended", "Archived"]).default("Upcoming"),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        points: z.number().int().min(0).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.challenge.create({
        data: {
          title: input.title,
          description: input.description ?? null,
          status: input.status,
          startDate: input.startDate ?? null,
          endDate: input.endDate ?? null,
          points: input.points ?? 0,
        },
      });
    }),

  updateChallengeStatus: adminProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["Upcoming", "Active", "Ended", "Archived"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.challenge.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),
});
