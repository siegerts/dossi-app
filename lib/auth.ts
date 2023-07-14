import { env } from "@/env.mjs"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"

import { freePlan, proPlan, teamPlan } from "@/config/subscriptions"
import prisma from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(prisma as any),

  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        if (token.plan) {
          // @ts-ignore
          session.user.plan = token.plan
        }
        if (token.role) {
          // @ts-ignore
          session.user.role = token.role
        }
      }

      return session
    },
    async jwt({ token, user }) {
      // NEVER TOUCH THIS - EVER
      const dbUser = await prisma.user.findFirst({
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

      const isPaid =
        dbUser?.stripePriceId &&
        dbUser?.stripeCurrentPeriodEnd &&
        dbUser?.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()

      let plan = freePlan

      if (isPaid) {
        if (dbUser.stripePriceId === env.STRIPE_PRO_MONTHLY_PLAN_ID) {
          plan = proPlan
        }
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        plan: plan.name as string,
        role: ["ADMIN", "TEST"].includes(dbUser.role) ? dbUser.role : undefined,
      }
    },
  },
}
