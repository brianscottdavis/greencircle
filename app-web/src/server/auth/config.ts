import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { credentialsProvider } from "~/lib/auth/credentialsProvider";
import { AUTH_CONFIG } from "~/server/auth/authSettings";
import { env } from "~/env";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  providers: [credentialsProvider],
  session: {
    strategy: "jwt",
    maxAge: AUTH_CONFIG.SESSION_TIMEOUT,
    updateAge: AUTH_CONFIG.SESSION_UPDATE_AGE,
  },
  pages: {
    signIn: "/login",
    signOut: "/signout",
    error: "/login",
  },
  secret: env.AUTH_SECRET ?? (process.env.NODE_ENV === "development" ? "dev-secret-change-in-production" : undefined),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
