import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const REQUEST_TYPES = ["BulkyPickup", "Overflow", "MissedService"] as const;

export const serviceRequestRouter = createTRPCRouter({
  listMine: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.serviceRequest.findMany({
      where: { createdById: ctx.session.user.id },
      orderBy: { id: "desc" },
      include: { household: true },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        requestType: z.enum(REQUEST_TYPES),
        description: z.string().optional(),
        householdId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const membership = await ctx.db.householdMember.findFirst({
        where: {
          userId: ctx.session.user.id,
          householdId: input.householdId,
        },
      });
      if (!membership) {
        throw new Error("You must belong to this household to create a request");
      }

      return ctx.db.serviceRequest.create({
        data: {
          householdId: input.householdId,
          createdById: ctx.session.user.id,
          requestType: input.requestType,
          description: input.description ?? null,
          photoUrls: [],
          status: "Submitted",
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.serviceRequest.findFirst({
        where: {
          id: input.id,
          createdById: ctx.session.user.id,
        },
        include: { job: true },
      });
      if (!existing) {
        throw new Error("Request not found or you cannot delete it");
      }
      if (existing.job) {
        await ctx.db.job.delete({ where: { id: existing.job.id } });
      }
      await ctx.db.serviceRequest.delete({ where: { id: input.id } });
      return { deleted: true };
    }),
});
