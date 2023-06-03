import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string
type Role = string
type Plan = string

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
      plan: Plan
    }
  }

  interface User extends DefaultUser {
    id: string
    role: string
    plan: string
  }
}
