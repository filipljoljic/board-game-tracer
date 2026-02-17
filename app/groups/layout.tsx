import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function GroupsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }
  return children
}
