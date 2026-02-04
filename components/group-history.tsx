import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'

interface SessionHistory {
    id: string
    gameName: string
    playedAt: Date | string  // Can be string when coming from cache
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
                    {new Date(session.playedAt).toLocaleDateString()}
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
          {sessions.length === 0 && (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
              <h4 className="font-medium mb-1">No sessions yet</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Start recording game sessions to build your history
              </p>
              <Button size="sm" asChild>
                <Link href="/sessions/new">Record First Session</Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
