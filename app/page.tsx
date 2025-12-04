import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import Link from 'next/link'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateGroupDialog } from '@/components/create-group-dialog'

export default async function Home() {
  const session = await auth()
  
  const groups = await prisma.group.findMany({
    where: {
      members: {
        some: { userId: session?.user?.id }
      }
    }
  })

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Board Game Tracker</h1>
        <CreateGroupDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {groups.map((group) => (
          <Link key={group.id} href={`/groups/${group.id}`} data-testid="group-card">
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>{group.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
