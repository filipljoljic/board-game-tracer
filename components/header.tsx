import Link from 'next/link'
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
          </nav>
        </div>
        <div>
          <Link href="/sessions/new">
            <Button size="sm">Record Session</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

