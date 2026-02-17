import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { getCachedGames } from '@/lib/cache'
import { CreateGameDialog } from '@/components/create-game-dialog'

export default async function GamesPage() {
  // Use cached games query - cached for 1 hour, invalidated on game create/update
  const games = await getCachedGames()

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Manage Games</h1>
        <CreateGameDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Link key={game.id} href={`/games/${game.id}`} data-testid="game-card">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle>{game.name}</CardTitle>
                <CardDescription>
                  {game._count.sessions} sessions
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

