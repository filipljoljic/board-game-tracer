# Deployment Guide

This guide walks you through deploying the Board Game Tracker to **Vercel** with **Neon** (PostgreSQL database) and **Clerk** (authentication).

## Cost: $0/month

| Service | Purpose | Monthly Cost |
|---------|---------|--------------|
| Vercel Hobby | Hosting (frontend + backend) | $0 |
| Neon Free | PostgreSQL database (0.5 GB) | $0 |
| Clerk Free | Authentication (up to 10k users) | $0 |

---

## Prerequisites

- GitHub account
- Node.js 18+ installed locally

---

## Step 1: Set Up Clerk Authentication

1. Go to [clerk.com](https://clerk.com) and sign up
2. Create a new application called "Board Game Tracker"
3. Select **Email** as the sign-in method
4. Go to **API Keys** in the dashboard
5. Copy your keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_`)
   - `CLERK_SECRET_KEY` (starts with `sk_`)

---

## Step 2: Set Up Neon Database

### Create Neon Account and Database

1. Go to [neon.tech](https://neon.tech) and sign up (free)
2. Click **"New Project"**
3. Name it "board-game-tracker"
4. Select a region close to you
5. Click **Create Project**

### Get Connection String

1. In your project dashboard, click **Connection Details**
2. Copy the **Connection string** (starts with `postgresql://`)
3. It looks like: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`

---

## Step 3: Update Schema for PostgreSQL

Before deploying, update your Prisma schema to use PostgreSQL:

Edit `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Then push the schema to Neon:

```bash
# Set the DATABASE_URL temporarily
export DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"

# Push schema to Neon
npx prisma db push
```

---

## Step 4: Deploy to Vercel

### Connect Repository

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Click **"Add New Project"**
4. Import your `board-game-tracker` repository

### Add Environment Variables

In Vercel project settings, add these environment variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://...` (from Neon) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_live_...` (from Clerk) |
| `CLERK_SECRET_KEY` | `sk_live_...` (from Clerk) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |

### Deploy

Click **Deploy** and wait for the build to complete.

---

## Step 5: Configure Clerk for Production

1. Go to your Clerk dashboard
2. Navigate to **Domains** settings
3. Add your Vercel URL (e.g., `board-game-tracker.vercel.app`)

---

## Step 6: Test Your Deployment

1. Visit your Vercel URL
2. You should be redirected to sign-in page
3. Click **Sign Up** to create an account
4. Verify you can access the app
5. Test creating a group, adding a game, recording a session

---

## Local Development

For local development, create a `.env.local` file:

```env
# Clerk (use test keys from dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Local SQLite database (for development)
DATABASE_URL=file:./dev.db
```

Then run:

```bash
npm run dev
```

---

## Troubleshooting

### "Unauthorized" error after sign-in
- Check that `CLERK_SECRET_KEY` is set correctly in Vercel
- Verify your domain is added to Clerk's allowed origins

### Database connection errors
- Verify `DATABASE_URL` is the full Neon connection string
- Make sure it includes `?sslmode=require` at the end
- Check Neon dashboard to ensure database is active

### Build fails
- Check Vercel build logs for specific errors
- Ensure all environment variables are set

---

## Sharing with Friends

Once deployed, share your Vercel URL with friends:
1. They visit the URL
2. Click **Sign Up**
3. Create account with email/password
4. Start tracking board game sessions together!

All data syncs to the cloud and is accessible from any device.

