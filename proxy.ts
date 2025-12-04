import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

// Use the edge-compatible auth config (no database, no bcrypt)
const { auth } = NextAuth(authConfig)

// Export as default proxy function for Next.js 16
export default auth

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

