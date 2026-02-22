import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const challengeRouter = createTRPCRouter({
  listPublic: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.challenge.findMany({
      where: { status: { in: ["Upcoming", "Active"] } },
      orderBy: { startDate: "asc" },
    });
  }),

  listMine: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.challengeParticipation.findMany({
      where: { userId: ctx.session.user.id },
      include: { challenge: true },
      orderBy: { challenge: { startDate: "asc" } },
    });
  }),

  join: protectedProcedure
    .input(z.object({ challengeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.challengeParticipation.upsert({
        where: {
          challengeId_userId: {
            challengeId: input.challengeId,
            userId: ctx.session.user.id,
          },
        },
        create: {
          challengeId: input.challengeId,
          userId: ctx.session.user.id,
          progress: 0,
        },
        update: {},
      });
    }),

  updateProgress: protectedProcedure
    .input(z.object({ participationId: z.string(), progress: z.number().min(0) }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.challengeParticipation.findFirst({
        where: {
          id: input.participationId,
          userId: ctx.session.user.id,
        },
      });
      if (!existing) throw new Error("Participation not found");

      return ctx.db.challengeParticipation.update({
        where: { id: input.participationId },
        data: { progress: input.progress },
      });
    }),
});
