# Deployment Guide

This guide walks you through deploying the Board Game Tracker to **Vercel** with **Neon** (PostgreSQL database) and **NextAuth** (authentication with email verification).

## Cost: $0/month

| Service | Purpose | Monthly Cost |
|---------|---------|--------------|
| Vercel Hobby | Hosting (frontend + backend) | $0 |
| Neon Free | PostgreSQL database (0.5 GB) | $0 |
| Resend Free | Email delivery (3,000 emails/month) | $0 |

---

## Prerequisites

- GitHub account
- Node.js 18+ installed locally

---

## Step 1: Set Up Resend for Email Verification

1. Go to [resend.com](https://resend.com) and sign up
2. Verify your domain or use Resend's test domain
3. Go to **API Keys** in the dashboard
4. Create a new API key
5. Copy your `RESEND_API_KEY` (starts with `re_`)

**Note**: For production, you'll need to verify a domain. For testing, you can use Resend's test domain which allows sending to any email address.

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

## Step 3: Generate AUTH_SECRET

NextAuth requires a secret key for encrypting session tokens. Generate one using:

```bash
openssl rand -base64 32
```

Copy the generated secret - you'll need it for the Vercel environment variables.

---

## Step 4: Update Schema for PostgreSQL

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

## Step 5: Deploy to Vercel

### Connect Repository

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Click **"Add New Project"**
4. Import your `board-game-tracker` repository

### Add Environment Variables

In Vercel project settings, go to **Settings** → **Environment Variables** and add:

| Variable | Value | Required | Notes |
|----------|-------|----------|-------|
| `DATABASE_URL` | `postgresql://...` | ✅ Yes | Full Neon connection string |
| `AUTH_SECRET` | `...` (from Step 3) | ✅ Yes | Generated secret for NextAuth |
| `RESEND_API_KEY` | `re_...` | ✅ Yes | From Resend dashboard |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.com` | ❌ No | Only needed for custom domains. If not set, `VERCEL_URL` is used automatically |

**Important Notes:**
- `VERCEL_URL` is automatically provided by Vercel - you don't need to set it manually
- If you're using a custom domain, set `NEXT_PUBLIC_APP_URL` to your full domain URL (e.g., `https://boardgames.example.com`)
- For Vercel's default domain, leave `NEXT_PUBLIC_APP_URL` unset - the app will automatically use `VERCEL_URL`

### Deploy

Click **Deploy** and wait for the build to complete.

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
# NextAuth secret (generate with: openssl rand -base64 32)
AUTH_SECRET=your-local-secret-here

# Resend API key (from Resend dashboard)
RESEND_API_KEY=re_...

# Optional: Set app URL for local development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Local SQLite database (for development)
DATABASE_URL=file:./prisma/dev.db
```

Then run:

```bash
npm run dev
```

**Note**: For local development, you can use Resend's test API key which allows sending emails to any address without domain verification.

---

## Troubleshooting

### MissingSecret error
- **Error**: `MissingSecret: Please define a 'secret'`
- **Solution**: Ensure `AUTH_SECRET` is set in Vercel environment variables
- Generate a new secret with: `openssl rand -base64 32`
- Add it to Vercel → Settings → Environment Variables → `AUTH_SECRET`

### Verification emails contain localhost URLs
- **Problem**: Email links point to `http://localhost:3000`
- **Solution**: The app automatically uses `VERCEL_URL` if `NEXT_PUBLIC_APP_URL` is not set
- If using a custom domain, set `NEXT_PUBLIC_APP_URL` to your full domain URL (e.g., `https://your-domain.com`)
- Redeploy after adding the environment variable

### Database connection errors
- Verify `DATABASE_URL` is the full Neon connection string
- Make sure it includes `?sslmode=require` at the end
- Check Neon dashboard to ensure database is active

### Email sending fails
- Verify `RESEND_API_KEY` is set correctly in Vercel
- Check Resend dashboard for API key status
- For production, ensure your domain is verified in Resend

### Build fails
- Check Vercel build logs for specific errors
- Ensure all required environment variables are set:
  - `DATABASE_URL` ✅
  - `AUTH_SECRET` ✅
  - `RESEND_API_KEY` ✅

---

## Sharing with Friends

Once deployed, share your Vercel URL with friends:
1. They visit the URL
2. Click **Sign Up**
3. Create account with email/password
4. Start tracking board game sessions together!

All data syncs to the cloud and is accessible from any device.

