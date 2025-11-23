import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateGroupDialog } from '@/components/create-group-dialog'

export default async function Home() {
  const groups = await prisma.group.findMany()

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Board Game Tracker</h1>
        <CreateGroupDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {groups.map((group) => (
          <Link key={group.id} href={`/groups/${group.id}`}>
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
