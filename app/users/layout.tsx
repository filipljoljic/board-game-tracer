import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manage Users',
  description: 'Add and manage guest users for tracking board game sessions'
}

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  // Admin-only access
  const isAdmin = (session.user as { isAdmin?: boolean }).isAdmin
  if (!isAdmin) {
    redirect('/')
  }

  return children
}
