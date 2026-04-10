'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Swords } from 'lucide-react'

interface Group {
  id: string
  name: string
}

interface Opponent {
  id: string
  name: string
}

interface HeadToHeadData {
  player: { id: string; name: string }
  opponent: { id: string; name: string }
  totalGames: number
  playerWins: number
  opponentWins: number
  draws: number
  currentStreak: { player: string; count: number } | null
  mostPlayedGame: { name: string; count: number } | null
  perGame: { gameName: string; playerWins: number; opponentWins: number; totalPlayed: number }[]
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function HeadToHead({ userId, opponents }: { userId: string; opponents: Opponent[] }) {
  const [opponentId, setOpponentId] = useState<string>('')

  const { data, isLoading } = useSWR<HeadToHeadData>(
    opponentId ? `/api/players/${userId}/head-to-head/${opponentId}` : null,
    fetcher
  )

  if (opponents.length === 0) {
    return (
      <div className="text-center py-8">
        <Swords className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">Play some games to see head-to-head stats</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <Select value={opponentId} onValueChange={setOpponentId}>
          <SelectTrigger className="w-full sm:w-[250px]">
            <SelectValue placeholder="Select opponent" />
          </SelectTrigger>
          <SelectContent>
            {opponents.map(o => (
              <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}

      {data && data.totalGames > 0 && (
        <div className="space-y-4">
          {/* Win/Loss Bar */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span>{data.player.name}: {data.playerWins} wins</span>
                <span>{data.opponent.name}: {data.opponentWins} wins</span>
              </div>
              <div className="flex h-4 rounded-full overflow-hidden bg-muted">
                {data.playerWins > 0 && (
                  <div
                    className="bg-primary transition-all"
                    style={{ width: `${(data.playerWins / data.totalGames) * 100}%` }}
                  />
                )}
                {data.draws > 0 && (
                  <div
                    className="bg-muted-foreground/30 transition-all"
                    style={{ width: `${(data.draws / data.totalGames) * 100}%` }}
                  />
                )}
                {data.opponentWins > 0 && (
                  <div
                    className="bg-destructive/70 transition-all"
                    style={{ width: `${(data.opponentWins / data.totalGames) * 100}%` }}
                  />
                )}
              </div>
              <div className="grid grid-cols-3 text-center text-sm text-muted-foreground">
                <span>Total games: {data.totalGames}</span>
                {data.draws > 0 && <span>Draws: {data.draws}</span>}
                {data.currentStreak && (
                  <span>Streak: {data.currentStreak.player === userId ? data.player.name : data.opponent.name} ({data.currentStreak.count})</span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Most Played Game */}
          {data.mostPlayedGame && (
            <p className="text-sm text-muted-foreground">
              Most played together: <span className="font-medium text-foreground">{data.mostPlayedGame.name}</span> ({data.mostPlayedGame.count} times)
            </p>
          )}

          {/* Per Game Breakdown */}
          {data.perGame.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Per Game Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.perGame.map(g => (
                    <div key={g.gameName} className="flex items-center justify-between text-sm">
                      <span className="font-medium truncate flex-1">{g.gameName}</span>
                      <span className="text-muted-foreground ml-2 shrink-0">
                        {g.playerWins}W - {g.opponentWins}L ({g.totalPlayed} games)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {data && data.totalGames === 0 && (
        <p className="text-sm text-muted-foreground">No games played together yet</p>
      )}
    </div>
  )
}
