import bcrypt from "bcrypt"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  providers: [
    CredentialsProvider({
      credentials: {},
      // @ts-ignore
      async authorize({ email, password }) {
        if (!email || !password) return null

        const user = await db.user.findFirst({
          where: {
            email,
          },
          select: {
            firstName: true,
            lastName: true,
            email: true,
            image: true,
            password: true
          }
        })

        if (!user?.password) return null

        if (await comparePassword(password, user.password)) {
          return { firstName: user.firstName, lastName: user.lastName, email: user.email, image: user.image }
        }
      }
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.firstName = token.firstName as string
        session.user.lastName = token.lastName as string
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}

export async function comparePassword(plaintextPassword: string, hash: string) {
  return await bcrypt.compare(plaintextPassword, hash);
}
