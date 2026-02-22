import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const householdRouter = createTRPCRouter({
  listMine: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.householdMember.findMany({
      where: { userId: ctx.session.user.id },
      include: { household: true },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        addressLine1: z.string().min(1, "Address is required"),
        suburb: z.string().optional(),
        postcode: z.string().optional(),
        zone: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const memberCount = await ctx.db.householdMember.count({
        where: { userId: ctx.session.user.id },
      });
      const isPrimary = memberCount === 0;

      const household = await ctx.db.household.create({
        data: {
          addressLine1: input.addressLine1,
          suburb: input.suburb ?? null,
          postcode: input.postcode ?? null,
          zone: input.zone ?? null,
        },
      });

      await ctx.db.householdMember.create({
        data: {
          userId: ctx.session.user.id,
          householdId: household.id,
          isPrimary,
        },
      });

      return household;
    }),

  update: protectedProcedure
    .input(
      z.object({
        householdId: z.string(),
        addressLine1: z.string().min(1, "Address is required"),
        suburb: z.string().optional(),
        postcode: z.string().optional(),
        zone: z.string().optional(),
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
        throw new Error("You do not have permission to edit this household");
      }

      return ctx.db.household.update({
        where: { id: input.householdId },
        data: {
          addressLine1: input.addressLine1,
          suburb: input.suburb ?? null,
          postcode: input.postcode ?? null,
          zone: input.zone ?? null,
        },
      });
    }),
});
