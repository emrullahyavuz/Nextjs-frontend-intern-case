import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


const handler = NextAuth({
 providers: [
   GoogleProvider({
     clientId: process.env.GOOGLE_CLIENT_ID || "",
     clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
   }),
   GithubProvider({
     clientId: process.env.GITHUB_CLIENT_ID || "",
     clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
   }),
   CredentialsProvider({
     name: "Credentials",
     credentials: {
       email: { label: "Email", type: "email" },
       password: { label: "Password", type: "password" }
     },
     async authorize(credentials) {
      try {
        // Veritabanından kullanıcıyı email'e göre buluyoruz
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          }
        });
         // Kullanıcı bulunamadıysa hata fırlat
        if (!user) {
          throw new Error("Bu email adresi ile kayıtlı kullanıcı bulunamadı!");
        }
         // Şifre kontrolü (sabit şifre: 123456)
        if (credentials?.password === "123456") {
          // Başarılı giriş
          return {
            id: user.id,
            email: user.email
          };
        }
         // Şifre yanlışsa hata fırlat
        throw new Error("Şifre hatalı!");
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    }
   })
 ],
 pages: {
   signIn: "/auth/login", // Özel login sayfamızın yolu
 },
 session: {
   strategy: "jwt",
 },
 callbacks: {
   async jwt({ token, user }) {
     return { ...token, ...user };
   },
   async session({ session, token }) {
     session.user = token as any;
     return session;
   },
 },
 secret: process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };