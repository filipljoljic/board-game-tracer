import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  console.warn('Warning: RESEND_API_KEY is not set. Email functionality will not work.')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

// Determine the app URL for email links
// Priority: NEXT_PUBLIC_APP_URL > VERCEL_URL > localhost (dev fallback)
function getAppUrl(): string {
  // Use explicit NEXT_PUBLIC_APP_URL if set (for custom domains)
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }
  
  // Use Vercel's automatic VERCEL_URL (available in production)
  if (process.env.VERCEL_URL) {
    // VERCEL_URL doesn't include protocol, so add https://
    return `https://${process.env.VERCEL_URL}`
  }
  
  // Fallback to localhost for local development
  return 'http://localhost:3000'
}

export const APP_URL = getAppUrl()

