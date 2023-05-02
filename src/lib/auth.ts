import { env } from "@/lib/env.mjs";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  debug: process.env.NODE_ENV !== "production",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          image: token.picture,
        },
      };
    },
    async jwt({ token, user }) {
      const userFromDatabase = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!userFromDatabase) {
        if (user) {
          token.id = user?.id;
        }

        return token;
      }

      return {
        id: userFromDatabase.id,
        name: userFromDatabase.name,
        email: userFromDatabase.email,
        picture: userFromDatabase.image,
      };
    },
  },
};
