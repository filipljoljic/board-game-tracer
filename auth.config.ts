import type { NextAuthConfig } from 'next-auth'

// Edge-compatible auth config (NO database adapters, NO bcrypt)
// This config is used by middleware which runs in the Edge runtime
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
      
      // Public routes that don't require authentication
      const isOnAuthPage = 
        nextUrl.pathname === '/login' || 
        nextUrl.pathname === '/register' ||
        nextUrl.pathname === '/check-email' ||
        nextUrl.pathname === '/verify-email'
      
      // NextAuth API routes must always be accessible for auth to work
      const isAuthApiRoute = nextUrl.pathname.startsWith('/api/auth')

      // Allow auth API routes for everyone (required for NextAuth)
      if (isAuthApiRoute) {
        return true
      }

      // Allow auth pages for unauthenticated users
      if (isOnAuthPage) {
        // Redirect logged-in users away from auth pages (except verification pages)
        if (isLoggedIn && (nextUrl.pathname === '/login' || nextUrl.pathname === '/register')) {
          return Response.redirect(new URL('/', nextUrl))
        }
        return true
      }

      // All other routes require authentication
      if (!isLoggedIn) {
        return false // Redirects to /login
      }
      
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = (user as { username?: string }).username
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        (session.user as { username?: string }).username = token.username as string
      }
      return session
    }
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
}
