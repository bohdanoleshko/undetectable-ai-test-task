import type { DefaultSession, NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./app/api/prisma-api/prisma-client";
import { User } from "@prisma/client";

interface ExtendedUser extends User {
  username: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }

  interface Token {
    id: string;
    username: string;
  }
}

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: "myCustomSessionToken",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
    },
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnChatPage = nextUrl.pathname.startsWith("/chat");

      if (isOnChatPage) {
        if (isLoggedIn) {
          return true;
        }

        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/chat", nextUrl.href));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const extendedUser = user as unknown as ExtendedUser;
        token.id = extendedUser.id;
        token.username = extendedUser.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        const extendedToken = token as unknown as ExtendedUser;
        session.user.id = String(extendedToken.id) as string;
        session.user.username = extendedToken.username;
      }
      return session;
    },
  },
  providers: [],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
