import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manage Users | Board Game Tracker',
  description: 'Add and manage guest users for tracking board game sessions'
}

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
