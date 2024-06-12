<a href="https://dossi.dev">
  <img alt="Your own private GitHub notes on every page" src="https://github.com/siegerts/dossi-app/blob/main/dossi-1280x800.png">
</a>

  <h3 align="center">dossi</h3>

  <p align="center">
    Your own private GitHub notes on every page
    <br />
    <a href="https://dossi.dev"><strong>Learn more »</strong></a>
    <br />
    <br />
    <a href="https://chromewebstore.google.com/detail/dossi-private-github-note/ogpcmecajeghflaaaennkmknfpeghffm">Chrome Extension</a>
    |
    <a href="https://dossi.dev">Website</a>
    |
    <a href="https://github.com/siegerts/dossi-ext">Browser extension repo</a>
    |
     <a href="https://github.com/siegerts/dossi-app/issues">Feedback</a>
  </p>

## Introduction

This is the backend and web app for the dossi.dev browser extension.

## Functionality

- GitHub auth integration with NextAuth.js
- Label management
- Pin management
- Note management, search and filtering, and download
- Stripe integration for subscription management with customer portal

## Tech Stack

- [Next.js](https://nextjs.org/) – framework
- [TypeScript](https://www.typescriptlang.org/) – language
- [shadcn/ui](https://ui.shadcn.com/) – UI components
- [Tailwind](https://tailwindcss.com/) – CSS
- [Neon Postgres](https://neon.tech/) – database
- [Prisma](https://www.prisma.io/) – database orm and client
- [NextAuth.js](https://next-auth.js.org/) – auth
- [Stripe](https://stripe.com/) – payments
- [Vercel](https://vercel.com/) – deployments and hosting

## Getting Started

### Requirements

- Node.js
- pnpm
- Postgres
- Stripe account
- GitHub OAuth app (for NextAuth.js)

#### Environment variables

Create a `.env.local` file in the root of the project with the following environment variables:

```
# -----------------------------------------------------------------------------
# App
# -----------------------------------------------------------------------------
NEXT_PUBLIC_APP_URL=http://localhost:3000

# -----------------------------------------------------------------------------
# Authentication (NextAuth.js)
# -----------------------------------------------------------------------------
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# -----------------------------------------------------------------------------
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# -----------------------------------------------------------------------------
# Database (Postgres - Neon) Dev Branch
# -----------------------------------------------------------------------------
DATABASE_URL=

# -----------------------------------------------------------------------------
# Subscriptions (Stripe)
# -----------------------------------------------------------------------------
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_MONTHLY_PLAN_ID=

```

#### Install dependencies

```
pnpm install
```

#### Generate Prisma client

```
pnpm prisma generate
```

#### Start the development server

```
pnpm dev
```

## License

dossi is open source and available under the [GNU General Public License v3.0(AGPLv3)](LICENSE.md).
