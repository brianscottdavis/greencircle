import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const REPORT_TYPES = ["Contamination", "MissedPickup", "Overflow"] as const;

export const reportRouter = createTRPCRouter({
  listMine: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.report.findMany({
      where: { createdById: ctx.session.user.id },
      orderBy: { id: "desc" },
    });
  }),

  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const report = await ctx.db.report.findFirst({
        where: {
          id: input.id,
          createdById: ctx.session.user.id,
        },
      });
      if (!report) return null;
      return report;
    }),

  create: protectedProcedure
    .input(
      z.object({
        reportType: z.enum(REPORT_TYPES),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.report.create({
        data: {
          createdById: ctx.session.user.id,
          reportType: input.reportType,
          description: input.description ?? null,
          photoUrls: [],
          status: "Submitted",
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.report.findFirst({
        where: {
          id: input.id,
          createdById: ctx.session.user.id,
        },
      });
      if (!existing) {
        throw new Error("Report not found or you cannot delete it");
      }
      await ctx.db.report.delete({ where: { id: input.id } });
      return { deleted: true };
    }),
});
