import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogin";
import type { NextAuthOptions } from "next-auth"; // Import type แบบนี้

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const user = await userLogin(credentials.email, credentials.password);

        if (user) {
          return user; // ถ้า login สำเร็จ
        } else {
          return null; // ถ้า login fail
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // เพิ่ม secret เข้าไปด้วยนะ
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
