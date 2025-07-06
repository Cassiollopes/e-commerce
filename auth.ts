import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./src/lib/db";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [GitHub, Google],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
  },
});
