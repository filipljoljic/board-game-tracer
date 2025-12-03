import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  console.warn('Warning: RESEND_API_KEY is not set. Email functionality will not work.')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

