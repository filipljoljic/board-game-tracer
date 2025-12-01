'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { UserMenu } from '@/components/user-menu'

export default function Header() {
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'

  return (
    <header className="border-b">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            BoardTracker
          </Link>
          <nav className="space-x-4 text-sm font-medium">
            <Link href="/" className="hover:text-primary">Groups</Link>
            <Link href="/games" className="hover:text-primary">Games</Link>
            <Link href="/users" className="hover:text-primary">Users</Link>
            <Link href="/statistics" className="hover:text-primary">Statistics</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="h-8 w-20 bg-slate-200 animate-pulse rounded" />
          ) : session?.user ? (
            <>
              <Link href="/sessions/new">
                <Button size="sm">Record Session</Button>
              </Link>
              <UserMenu />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button size="sm" variant="outline">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
