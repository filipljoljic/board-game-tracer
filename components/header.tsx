import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function Header() {
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
          <SignedIn>
            <Link href="/sessions/new">
              <Button size="sm">Record Session</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="sm" variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

