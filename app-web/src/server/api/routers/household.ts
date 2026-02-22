import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const householdRouter = createTRPCRouter({
  listMine: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.householdMember.findMany({
      where: { userId: ctx.session.user.id },
      include: { household: true },
    });
  }),
});
