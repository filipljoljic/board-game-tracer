import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { prisma } from '@/lib/db'
import { CreateGameDialog } from '@/components/create-game-dialog'

export default async function GamesPage() {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: { templates: true, sessions: true },
      },
    },
  })

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Games</h1>
        <CreateGameDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Link key={game.id} href={`/games/${game.id}`}>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle>{game.name}</CardTitle>
                <CardDescription>
                  {game._count.templates} templates • {game._count.sessions} sessions
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

