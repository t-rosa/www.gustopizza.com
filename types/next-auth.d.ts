import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId,
  }
}

declare module "next-auth" {
  interface User {
    firstName: string,
    lastName: string
  }

  interface Session {
    user: User & {
      id: UserId
      firstName: string,
      lastName: string
    }
  }
}
