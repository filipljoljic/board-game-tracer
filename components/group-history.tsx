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
              <div className="flex justify-between items-center p-3 border rounded hover:bg-accent transition-colors">
                <div>
                  <p className="font-medium">{session.gameName}</p>
                  <p className="text-sm text-muted-foreground">
                    {session.playedAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                    <div className="text-sm font-semibold text-primary">
                        Winner: {session.winnerNames.join(', ')}
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

