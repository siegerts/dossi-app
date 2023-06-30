import { env } from "@/env.mjs"

import { SubscriptionPlan } from "types"

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 3 notes. Upgrade to the Pro plan for unlimited notes.",
  stripePriceId: "",
}

export const proPlan: SubscriptionPlan = {
  name: "Pro",
  description: "The Pro plan has includes 100 notes/month.",
  stripePriceId: env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
}
