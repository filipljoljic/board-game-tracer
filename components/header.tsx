'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { UserMenu } from '@/components/user-menu'
import { RandomizerDialog } from '@/components/randomizer-dialog'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold">
              BoardTracker
            </Link>
            <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
              <Link href="/" className="hover:text-primary">Groups</Link>
              <Link href="/games" className="hover:text-primary">Games</Link>
              <Link href="/users" className="hover:text-primary">Users</Link>
              <Link href="/statistics" className="hover:text-primary">Statistics</Link>
              <RandomizerDialog />
            </nav>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            {isLoading ? (
              <div className="h-8 w-20 bg-slate-200 animate-pulse rounded" />
            ) : session?.user ? (
              <>
                <Link href="/sessions/new" className="hidden md:block">
                  <Button size="sm">Record Session</Button>
                </Link>
                <UserMenu />
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </>
            ) : (
              <>
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/login">
                    <Button size="sm" variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4 space-y-3">
            <nav className="flex flex-col space-y-3 text-sm font-medium">
              <Link href="/" className="hover:text-primary py-2" onClick={() => setMobileMenuOpen(false)}>
                Groups
              </Link>
              <Link href="/games" className="hover:text-primary py-2" onClick={() => setMobileMenuOpen(false)}>
                Games
              </Link>
              <Link href="/users" className="hover:text-primary py-2" onClick={() => setMobileMenuOpen(false)}>
                Users
              </Link>
              <Link href="/statistics" className="hover:text-primary py-2" onClick={() => setMobileMenuOpen(false)}>
                Statistics
              </Link>
              <div className="py-2">
                <RandomizerDialog />
              </div>
            </nav>
            {session?.user && (
              <div className="pt-2 border-t">
                <Link href="/sessions/new" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full">Record Session</Button>
                </Link>
              </div>
            )}
            {!session?.user && (
              <div className="pt-2 border-t flex flex-col gap-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
