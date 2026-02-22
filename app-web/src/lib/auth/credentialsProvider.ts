import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { db } from "~/server/db";

export const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email", placeholder: "you@example.com" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    const email = credentials?.email as string | undefined;
    const password = credentials?.password as string | undefined;

    if (!email || !password) return null;

    const user = await db.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user?.password) return null;

    const valid = await compare(password, user.password);
    if (!valid) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email ?? undefined,
      image: user.image ?? undefined,
      role: user.role ?? "resident",
    };
  },
});
