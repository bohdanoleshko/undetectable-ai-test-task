import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { prisma } from "@/app/api/prisma-api/prisma-client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const user = await prisma.user.findUnique({
            where: { username: parsedCredentials.data.username },
          });

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcryptjs.compare(
            parsedCredentials.data.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: String(user.id),
            username: user.username,
            password: user.password,
          };
        }

        return null;
      },
    }),
  ],
});
