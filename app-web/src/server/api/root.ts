import { adminRouter } from "~/server/api/routers/admin";
import { authRouter } from "~/server/api/routers/auth";
import { challengeRouter } from "~/server/api/routers/challenge";
import { jobRouter } from "~/server/api/routers/job";
import { healthRouter } from "~/server/api/routers/health";
import { householdRouter } from "~/server/api/routers/household";
import { noticeboardRouter } from "~/server/api/routers/noticeboard";
import { offlineRouter } from "~/server/api/routers/offline";
import { reportRouter } from "~/server/api/routers/report";
import { serviceRequestRouter } from "~/server/api/routers/service-request";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * Primary router for the server.
 * Add routers from /api/routers here.
 */
export const appRouter = createTRPCRouter({
  admin: adminRouter,
  auth: authRouter,
  health: healthRouter,
  challenge: challengeRouter,
  household: householdRouter,
  job: jobRouter,
  noticeboard: noticeboardRouter,
  offline: offlineRouter,
  report: reportRouter,
  serviceRequest: serviceRequestRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
