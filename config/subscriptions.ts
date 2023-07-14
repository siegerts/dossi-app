import { env } from "@/env.mjs"

import { SubscriptionPlan } from "types"

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 10 notes. Upgrade to the Dev plan for 100 notes.",
  stripePriceId: "",
  notes: 10,
  labels: 3,
  pins: 5,
}

// 7
// export const devPlan: SubscriptionPlan = {
//   name: "Dev",
//   description: "The Dev plan has includes 100 notes/month.",
//   stripePriceId: env.STRIPE_DEV_MONTHLY_PLAN_ID,
//   notes: 100,
//   labels: 25,
//   pins: 100,
// }

// 15
export const proPlan: SubscriptionPlan = {
  name: "Pro",
  description: "The Pro plan has includes 100 notes/month.",
  stripePriceId: env.STRIPE_PRO_MONTHLY_PLAN_ID,
  notes: 1000,
  labels: 50,
  pins: 100,
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
