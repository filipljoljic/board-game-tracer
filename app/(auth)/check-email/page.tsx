'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Mail, CheckCircle2 } from 'lucide-react'

function CheckEmailContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  async function handleResend() {
    if (!email || countdown > 0) return

    setIsResending(true)
    setError(null)
    setResendSuccess(false)

    try {
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to resend verification email')
        return
      }

      setResendSuccess(true)
      setCountdown(60) // 60 second cooldown
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>
            We&apos;ve sent a verification link to{' '}
            {email ? (
              <span className="font-medium text-foreground">{email}</span>
            ) : (
              'your email address'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Click the link in the email to verify your account. If you don&apos;t see
              it, check your spam folder.
            </p>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md text-center">
              {error}
            </div>
          )}

          {resendSuccess && (
            <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Verification email sent!
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleResend}
            disabled={isResending || countdown > 0 || !email}
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : countdown > 0 ? (
              `Resend in ${countdown}s`
            ) : (
              'Resend verification email'
            )}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Already verified?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          </CardHeader>
        </Card>
      </div>
    }>
      <CheckEmailContent />
    </Suspense>
  )
}

