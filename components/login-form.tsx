'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showResendOption, setShowResendOption] = useState(false)
  const [lastEmail, setLastEmail] = useState<string | null>(null)
  const [resendSuccess, setResendSuccess] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setShowResendOption(false)
    setResendSuccess(false)

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false
      })

      if (result?.error) {
        // Check if the error indicates email not verified
        if (result.error.includes('EMAIL_NOT_VERIFIED:')) {
          const email = result.error.split('EMAIL_NOT_VERIFIED:')[1]
          setError('Your email address has not been verified. Please check your inbox.')
          setShowResendOption(true)
          setLastEmail(email)
        } else {
          setError('Invalid username or password')
          // If login fails with credentials that might have an unverified email,
          // show the option to resend verification
          if (username.includes('@')) {
            setShowResendOption(true)
            setLastEmail(username)
          }
        }
        setIsLoading(false)
        return
      }

      router.push('/')
      router.refresh()
    } catch {
      setError('An unexpected error occurred')
      setIsLoading(false)
    }
  }

  async function handleResendVerification() {
    if (!lastEmail) return

    setIsLoading(true)
    setResendSuccess(false)

    try {
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: lastEmail })
      })

      if (response.ok) {
        setResendSuccess(true)
        setError(null)
      }
    } catch {
      // Silently fail - the API returns success even if email doesn't exist (security)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to sign in to your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}
          {resendSuccess && (
            <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
              Verification email sent! Please check your inbox.
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Username or Email</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="johndoe or johndoe@example.com"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>
          {showResendOption && lastEmail && (
            <div className="text-sm text-center">
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={isLoading}
                className="text-primary hover:underline disabled:opacity-50"
              >
                Didn&apos;t verify your email? Resend verification link
              </button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}


