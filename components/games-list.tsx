'use client'

import { useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CollectionStatusBadge, type CollectionStatus } from '@/components/collection-status-badge'
import { Button } from '@/components/ui/button'

const fetcher = (url: string) => fetch(url).then(r => r.json())

interface Game {
  id: string
  name: string
  _count: { sessions: number }
}

type Filter = 'ALL' | CollectionStatus

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'ALL', label: 'All Games' },
  { value: 'OWNED', label: 'Owned' },
  { value: 'WISHLIST', label: 'Wishlist' },
  { value: 'WANT_TO_PLAY', label: 'Want to Play' },
]

export function GamesList({ games }: { games: Game[] }) {
  const { data: collection = [] } = useSWR<{ gameId: string; status: CollectionStatus }[]>('/api/collection', fetcher)
  const [filter, setFilter] = useState<Filter>('ALL')

  const collectionMap = new Map(collection.map(c => [c.gameId, c.status]))

  const filteredGames = filter === 'ALL'
    ? games
    : games.filter(g => collectionMap.get(g.id) === filter)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <Button
            key={f.value}
            variant={filter === f.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {filteredGames.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          {filter === 'ALL' ? 'No games yet' : `No games marked as ${FILTERS.find(f => f.value === filter)?.label}`}
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game) => {
            const status = collectionMap.get(game.id)
            return (
              <Link key={game.id} href={`/games/${game.id}`} data-testid="game-card">
                <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="flex-1">{game.name}</CardTitle>
                      {status && <CollectionStatusBadge status={status} />}
                    </div>
                    <CardDescription>
                      {game._count.sessions} sessions
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
