import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "827028121409-g9lviuieviie21c8j4i1p26gc096qr64.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  debug: process.env.NODE_ENV !== "production",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
