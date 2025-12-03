'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Invalid verification link. No token provided.')
      return
    }

    async function verifyEmail() {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`)
        const data = await response.json()

        if (!response.ok) {
          if (data.error?.includes('expired')) {
            setStatus('expired')
            setMessage(data.error)
          } else {
            setStatus('error')
            setMessage(data.error || 'Verification failed')
          }
          return
        }

        setStatus('success')
        setMessage(data.message || 'Email verified successfully!')
      } catch {
        setStatus('error')
        setMessage('An unexpected error occurred')
      }
    }

    verifyEmail()
  }, [token])

  const icons = {
    loading: <Loader2 className="h-8 w-8 text-primary animate-spin" />,
    success: <CheckCircle2 className="h-8 w-8 text-green-500" />,
    error: <XCircle className="h-8 w-8 text-red-500" />,
    expired: <AlertCircle className="h-8 w-8 text-amber-500" />
  }

  const titles = {
    loading: 'Verifying your email...',
    success: 'Email verified!',
    error: 'Verification failed',
    expired: 'Link expired'
  }

  const bgColors = {
    loading: 'bg-primary/10',
    success: 'bg-green-100',
    error: 'bg-red-100',
    expired: 'bg-amber-100'
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          <div className={`mx-auto mb-4 h-16 w-16 rounded-full ${bgColors[status]} flex items-center justify-center`}>
            {icons[status]}
          </div>
          <CardTitle className="text-2xl font-bold">{titles[status]}</CardTitle>
          <CardDescription>
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === 'success' && (
            <p className="text-center text-sm text-muted-foreground">
              Your account has been verified. You can now sign in and start tracking
              your board game sessions.
            </p>
          )}
          {status === 'expired' && (
            <p className="text-center text-sm text-muted-foreground">
              Your verification link has expired. Please request a new one from the
              login page.
            </p>
          )}
          {status === 'error' && (
            <p className="text-center text-sm text-muted-foreground">
              There was a problem verifying your email. The link may be invalid or
              already used.
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {status === 'success' && (
            <Button className="w-full" onClick={() => router.push('/login')}>
              Sign in to your account
            </Button>
          )}
          {(status === 'error' || status === 'expired') && (
            <>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push('/login')}
              >
                Go to sign in
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Need a new verification link?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in to request one
                </Link>
              </p>
            </>
          )}
          {status === 'loading' && (
            <p className="text-sm text-center text-muted-foreground">
              Please wait while we verify your email...
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
            <CardTitle className="text-2xl font-bold">Verifying your email...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}

