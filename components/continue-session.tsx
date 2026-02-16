import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy, Medal, Award } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Session as PrismaSession, Game, Group, SessionPlayer, User } from '@/lib/prisma'

type LastSession = PrismaSession & {
  game: Game
  group: Group
  players: (SessionPlayer & { user: User })[]
}

interface ContinueSessionProps {
  session: LastSession
  userId: string
}

export function ContinueSession({ session, userId }: ContinueSessionProps) {
  const userPlayer = session.players.find(p => p.userId === userId)
  
  if (!userPlayer) return null

  const getPlacementIcon = (placement: number) => {
    if (placement === 1) return <Trophy className="h-5 w-5 text-yellow-600" />
    if (placement === 2) return <Medal className="h-5 w-5 text-gray-400" />
    if (placement === 3) return <Award className="h-5 w-5 text-amber-700" />
    return null
  }

  const getPlacementSuffix = (placement: number) => {
    if (placement === 1) return 'st'
    if (placement === 2) return 'nd'
    if (placement === 3) return 'rd'
    return 'th'
  }

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Continue Where You Left Off</h3>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold">{session.game.name}</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              in {session.group.name} · {formatDistanceToNow(new Date(session.playedAt), { addSuffix: true })}
            </p>
            <div className="flex items-center gap-2">
              {getPlacementIcon(userPlayer.placement)}
              <span className="text-sm font-medium">
                You placed {userPlayer.placement}{getPlacementSuffix(userPlayer.placement)}!
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link href={`/sessions/${session.id}`}>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                View Session
              </Button>
            </Link>
            <Link href={`/sessions/new?gameId=${session.gameId}&groupId=${session.groupId}`}>
              <Button size="sm" className="w-full sm:w-auto">
                Play Again
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
