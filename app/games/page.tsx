import { getCachedGames } from '@/lib/cache'
import { CreateGameDialog } from '@/components/create-game-dialog'
import { GamesList } from '@/components/games-list'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manage Games | Board Game Tracker',
  description: 'View and manage your board game collection and score templates'
}

export default async function GamesPage() {
  const games = await getCachedGames()

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Manage Games</h1>
        <CreateGameDialog />
      </div>

      <GamesList games={games} />
    </div>
  )
}

