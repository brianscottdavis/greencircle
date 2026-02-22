import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const offlineRouter = createTRPCRouter({
  listAssets: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.offlineAsset.findMany({
      orderBy: { cachedAt: "desc" },
      take: 50,
    });
  }),
});
