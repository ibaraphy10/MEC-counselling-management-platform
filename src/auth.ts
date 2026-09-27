import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      id: "dev-login",
      name: "Dev Quick Login",
      credentials: {
        email: { label: "Email", type: "email" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        const email = String(credentials.email).toLowerCase().trim();

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          const role = (credentials.role as Role) || "STUDENT";
          user = await prisma.user.create({
            data: {
              email,
              name: email.split("@")[0].replace(".", " "),
              role,
              department: role === "STUDENT" ? "Computer Science" : "Student Affairs",
              classYear: role === "STUDENT" ? "3rd Year" : null,
            },
          });
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          classYear: user.classYear,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const email = user.email.toLowerCase().trim();
        let dbUser = await prisma.user.findUnique({
          where: { email },
        });

        if (!dbUser) {
          let defaultRole: Role = "STUDENT";
          if (email === "counsellor@mec.ac.in") {
            defaultRole = "COUNSELLOR";
          } else if (email.startsWith("core.") || email === "core.fortitude@mec.ac.in") {
            defaultRole = "CORE";
          }

          dbUser = await prisma.user.create({
            data: {
              email,
              name: user.name || email.split("@")[0],
              role: defaultRole,
              googleId: account.providerAccountId,
              avatarUrl: user.image,
            },
          });
        } else if (!dbUser.googleId && account.providerAccountId) {
          await prisma.user.update({
            where: { id: dbUser.id },
            data: {
              googleId: account.providerAccountId,
              avatarUrl: user.image ?? dbUser.avatarUrl,
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user && user.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email.toLowerCase().trim() },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.department = dbUser.department;
          token.classYear = dbUser.classYear;
          token.name = dbUser.name;
        }
      }
      if (trigger === "update" && session?.user) {
        token.role = session.user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = (token.id as string) || token.sub || "";
        session.user.role = (token.role as Role) || "STUDENT";
        session.user.department = token.department as string | null;
        session.user.classYear = token.classYear as string | null;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
