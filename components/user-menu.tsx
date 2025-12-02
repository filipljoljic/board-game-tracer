'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { LogOut, User, ChevronDown } from 'lucide-react'

export function UserMenu() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  if (!session?.user) {
    return null
  }

  const userName = session.user.name || (session.user as { username?: string }).username || 'User'
  const initials = userName.slice(0, 2).toUpperCase()

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
          {initials}
        </div>
        <span className="hidden sm:inline">{userName}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg border z-20">
            <div className="p-3 border-b">
              <p className="text-sm font-medium">{userName}</p>
              {session.user.email && (
                <p className="text-xs text-muted-foreground">{session.user.email}</p>
              )}
            </div>
            <div className="p-1">
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 rounded-sm"
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                <User className="h-4 w-4" />
                Profile
              </button>
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-sm"
                onClick={() => {
                  signOut({ callbackUrl: '/' })
                }}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}


