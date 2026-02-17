import type { NextAuthConfig } from 'next-auth'

// Validate AUTH_SECRET in production
const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL

if (isProduction && !authSecret) {
  throw new Error(
    'Missing AUTH_SECRET: Please define AUTH_SECRET or NEXTAUTH_SECRET environment variable. ' +
    'Generate a secret with: openssl rand -base64 32'
  )
}

// Edge-compatible auth config (NO database adapters, NO bcrypt)
// This config is used by proxy which runs in the Edge runtime
export const authConfig: NextAuthConfig = {
  providers: [], // Providers are added in auth.ts (with DB access)
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const { pathname } = nextUrl
      
      // Public routes that don't require authentication
      const isOnAuthPage = 
        pathname === '/login' || 
        pathname === '/register' ||
        pathname === '/check-email' ||
        pathname === '/verify-email'
      
      // NextAuth API routes must always be accessible for auth to work
      const isAuthApiRoute = pathname.startsWith('/api/auth')

      // Allow auth API routes for everyone (required for NextAuth)
      if (isAuthApiRoute) {
        return true
      }

      // Allow auth pages for unauthenticated users
      if (isOnAuthPage) {
        // Redirect logged-in users away from auth pages (except verification pages)
        if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
          return Response.redirect(new URL('/', nextUrl))
        }
        return true
      }

      // All other routes require authentication
      if (!isLoggedIn) {
        return false // Redirects to /login
      }

      // Admin-only routes
      const isOnUsersPage = pathname.startsWith('/users')
      if (isOnUsersPage) {
        const isAdmin = auth?.user && (auth.user as { isAdmin?: boolean }).isAdmin
        if (!isAdmin) {
          return Response.redirect(new URL('/', nextUrl))
        }
      }
      
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = (user as { username?: string }).username || undefined
        token.isAdmin = (user as { isAdmin?: boolean }).isAdmin ?? false
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        (session.user as { username?: string; isAdmin?: boolean }).username = token.username as string;
        (session.user as { username?: string; isAdmin?: boolean }).isAdmin = token.isAdmin as boolean
      }
      return session
    }
  },
  secret: authSecret
}
