import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  getSession: protectedProcedure.query(async ({ ctx }) => {
    return {
      user: ctx.session.user,
    };
  }),

  register: publicProcedure
    .input(
      z
        .object({
          email: z.string().email(),
          password: z.string().min(8, "Password must be at least 8 characters"),
          confirmPassword: z.string(),
          name: z.string().optional(),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords do not match",
          path: ["confirmPassword"],
        })
    )
    .mutation(async ({ ctx, input }) => {
      const email = input.email.toLowerCase().trim();
      const existing = await ctx.db.user.findUnique({
        where: { email },
      });
      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "An account with this email already exists.",
        });
      }
      const hashedPassword = await hash(input.password, 10);
      await ctx.db.user.create({
        data: {
          email,
          name: input.name ?? null,
          password: hashedPassword,
          role: "resident",
        },
      });
      return { success: true };
    }),
});
