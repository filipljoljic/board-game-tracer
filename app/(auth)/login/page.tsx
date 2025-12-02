import { LoginForm } from '@/components/login-form'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

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


