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

  updateUser: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        email: z.string().email().optional().nullable(),
        role: z.enum(["resident", "crew", "ambassador", "admin"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const update: { name?: string; email?: string | null; role?: string } = {};
      if (data.name !== undefined) update.name = data.name;
      if (data.email !== undefined) update.email = data.email;
      if (data.role !== undefined) update.role = data.role;

      if (update.email !== undefined) {
        const existing = await ctx.db.user.findFirst({
          where: { email: update.email, id: { not: id } },
        });
        if (existing) throw new Error("Email already in use");
      }

      return ctx.db.user.update({
        where: { id },
        data: update,
      });
    }),

  deleteUser: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (input.id === ctx.session.user.id) {
        throw new Error("You cannot delete your own account");
      }
      await ctx.db.user.delete({ where: { id: input.id } });
      return { deleted: true };
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

  dashboardStats: adminProcedure.query(async ({ ctx }) => {
    const [serviceRequestsByType, serviceRequestsByStatus, reportsByType, reportsByStatus, jobsByStatus] =
      await Promise.all([
        ctx.db.serviceRequest.groupBy({
          by: ["requestType"],
          _count: { id: true },
        }),
        ctx.db.serviceRequest.groupBy({
          by: ["status"],
          _count: { id: true },
        }),
        ctx.db.report.groupBy({
          by: ["reportType"],
          _count: { id: true },
        }),
        ctx.db.report.groupBy({
          by: ["status"],
          _count: { id: true },
        }),
        ctx.db.job.groupBy({
          by: ["status"],
          _count: { id: true },
        }),
      ]);

    return {
      serviceRequestsByType: serviceRequestsByType.map((r) => ({ name: r.requestType.replace(/([A-Z])/g, " $1").trim(), count: r._count.id })),
      serviceRequestsByStatus: serviceRequestsByStatus.map((r) => ({ name: r.status, count: r._count.id })),
      reportsByType: reportsByType.map((r) => ({ name: r.reportType.replace(/([A-Z])/g, " $1").trim(), count: r._count.id })),
      reportsByStatus: reportsByStatus.map((r) => ({ name: r.status, count: r._count.id })),
      jobsByStatus: jobsByStatus.map((r) => ({ name: r.status, count: r._count.id })),
    };
  }),
});
