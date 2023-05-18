import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string
type Role = string

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
      role: Role
    }
  }

  interface User extends DefaultUser {
    id: string
    role: string
  }
}
