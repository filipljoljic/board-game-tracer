import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Trophy, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface HomeGroupCardProps {
  group: {
    id: string
    name: string
    _count: {
      members: number
      sessions: number
    }
    lastPlayedAt: Date | null
    leaderName: string | null
  }
}

export function HomeGroupCard({ group }: HomeGroupCardProps) {
  return (
    <Link href={`/groups/${group.id}`}>
      <Card className="hover:bg-accent transition-colors cursor-pointer h-full border-l-4 border-l-primary/20 hover:border-l-primary hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">{group.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{group._count.members} {group._count.members === 1 ? 'member' : 'members'}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{group._count.sessions} {group._count.sessions === 1 ? 'session' : 'sessions'}</span>
          </div>
          
          {group.leaderName && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Trophy className="h-4 w-4 text-yellow-600" />
              <span className="truncate">Leader: {group.leaderName}</span>
            </div>
          )}
          
          {group.lastPlayedAt && (
            <div className="text-xs text-muted-foreground pt-1">
              Last played {formatDistanceToNow(new Date(group.lastPlayedAt), { addSuffix: true })}
            </div>
          )}
          
          {!group.lastPlayedAt && (
            <div className="text-xs text-muted-foreground pt-1 italic">
              No sessions yet
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
