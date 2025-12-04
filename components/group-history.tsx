import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SessionHistory {
    id: string
    gameName: string
    playedAt: Date
    winnerNames: string[]
}

export function GroupHistory({ sessions }: { sessions: SessionHistory[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Session History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map(session => (
            <Link key={session.id} href={`/sessions/${session.id}`} className="block">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 p-3 border rounded hover:bg-accent transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{session.gameName}</p>
                  <p className="text-sm text-muted-foreground">
                    {session.playedAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="md:text-right flex-shrink-0">
                    <div className="text-sm font-semibold text-primary break-words">
                        Winner: {session.winnerNames.length > 0 ? session.winnerNames.join(', ') : 'Unknown'}
                    </div>
                </div>
              </div>
            </Link>
          ))}
          {sessions.length === 0 && <p className="text-muted-foreground">No sessions recorded.</p>}
        </div>
      </CardContent>
    </Card>
  )
}
