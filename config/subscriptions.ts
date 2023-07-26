import { env } from "@/env.mjs"

import { SubscriptionPlan } from "types"

export const freePlan: SubscriptionPlan = {
  name: "FREE",
  description:
    "The free plan is limited to 25 notes. Upgrade to the PRO plan for unlimited notes, labels, and pins.",
  stripePriceId: "",
  notes: 25,
  labels: 3,
  pins: 10,
}

// 7
export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description:
    "The PRO plan has includes unlimited notes and higher usage limits.",
  stripePriceId: env.STRIPE_PRO_MONTHLY_PLAN_ID,
  notes: 1000,
  labels: 1000,
  pins: 1000,
}

// 25
// export const teamPlan: SubscriptionPlan = {
//   name: "Team",
//   description: "",
//   stripePriceId: env.STRIPE_TEAM_MONTHLY_PLAN_ID,
//   notes: 250,
//   labels: 100,
//   pins: 250,
// }

// export const entPlan: SubscriptionPlan = {
//   name: "Enterprise",
//   description: "",
//   stripePriceId: env.STRIPE_ENT_MONTHLY_PLAN_ID,
//   notes: ,
//   labels: ,
//   pins:
// }
