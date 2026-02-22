import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { ROLES } from "~/lib/auth/roles";

export const jobRouter = createTRPCRouter({
  listForCrew: protectedProcedure.query(async ({ ctx }) => {
    const role = (ctx.session.user as { role?: string }).role;
    if (role !== ROLES.CREW && role !== ROLES.ADMIN) {
      return [];
    }
    return ctx.db.job.findMany({
      where: { status: { in: ["Requested", "Scheduled", "Assigned", "InProgress"] } },
      include: {
        serviceRequest: { include: { household: true } },
        assignments: { include: { user: true } },
      },
      orderBy: { scheduledFor: "asc" },
    });
  }),

  listForAdmin: protectedProcedure.query(async ({ ctx }) => {
    const role = (ctx.session.user as { role?: string }).role;
    if (role !== ROLES.ADMIN && role !== ROLES.AMBASSADOR) {
      return [];
    }
    return ctx.db.job.findMany({
      include: {
        serviceRequest: { include: { household: true, createdBy: true } },
        assignments: { include: { user: true } },
      },
      orderBy: { id: "desc" },
    });
  }),

  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const role = (ctx.session.user as { role?: string }).role;
      const canAccess = role === ROLES.CREW || role === ROLES.ADMIN || role === ROLES.AMBASSADOR;
      if (!canAccess) return null;

      return ctx.db.job.findUnique({
        where: { id: input.id },
        include: {
          serviceRequest: { include: { household: true, createdBy: true } },
          assignments: { include: { user: true } },
          events: { orderBy: { createdAt: "desc" } },
        },
      });
    }),

  complete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const role = (ctx.session.user as { role?: string }).role;
      if (role !== ROLES.CREW && role !== ROLES.ADMIN) {
        throw new Error("Unauthorized");
      }

      return ctx.db.job.update({
        where: { id: input.id },
        data: {
          status: "Completed",
          completedAt: new Date(),
        },
      });
    }),
});
