import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const noticeboardRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.noticeboardPost.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }),
});
