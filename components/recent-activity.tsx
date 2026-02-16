import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Session as PrismaSession, Game, Group, SessionPlayer, User } from '@/lib/prisma'

type RecentSession = PrismaSession & {
  game: Game
  group: Group
  players: (SessionPlayer & { user: User })[]
}

interface RecentActivityProps {
  sessions: RecentSession[]
}

export function RecentActivity({ sessions }: RecentActivityProps) {
  if (sessions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2">No sessions yet</p>
          <p className="text-sm text-muted-foreground">Start by recording your first game!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sessions.map((session) => {
            const winners = session.players
              .filter(p => p.placement === 1)
              .map(p => p.user.name || p.user.username)
            
            const winnerText = winners.length === 1 
              ? winners[0] 
              : winners.length === 2
              ? `${winners[0]} & ${winners[1]}`
              : `${winners[0]} + ${winners.length - 1} others`

            return (
              <Link 
                key={session.id} 
                href={`/sessions/${session.id}`}
                className="block"
              >
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <Trophy className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{winnerText}</span> won{' '}
                      <span className="font-medium">{session.game.name}</span> in{' '}
                      <span className="text-muted-foreground">{session.group.name}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(session.playedAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
