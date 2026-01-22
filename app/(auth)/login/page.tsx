import { LoginForm } from '@/components/login-form'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

/**
 * Login Page Metadata
 * 
 * Auth pages need metadata too! Even though they're utility pages:
 * - Users might bookmark the login page
 * - The title appears in browser tabs
 * - Some users might share login links
 * - noindex can be added if you don't want it in search results
 */
export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Board Game Tracker account to track game sessions, view leaderboards, and manage your gaming groups.',
  // Optional: Prevent login page from appearing in search results
  // robots: { index: false, follow: true },
}

export default async function LoginPage() {
  const session = await auth()
  
  if (session?.user) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">BoardTracker</h1>
          <p className="text-muted-foreground mt-2">Track your board game sessions</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}


