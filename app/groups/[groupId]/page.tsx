import { Button } from '@/components/ui/button'
import LeaderboardTable from '@/components/leaderboard-table'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { GroupMembers } from '@/components/group-members'
import { GroupHistory } from '@/components/group-history'

export default async function GroupPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params
  
  const group = await prisma.group.findUnique({ where: { id: groupId } })
  if (!group) notFound()

  // Leaderboard Data
  const aggregation = await prisma.sessionPlayer.groupBy({
    by: ['userId'],
    where: { session: { groupId } },
    _sum: { pointsAwarded: true },
    _count: { sessionId: true },
    _avg: { placement: true },
  })

  const userIds = aggregation.map((a) => a.userId)
  const users = await prisma.user.findMany({ where: { id: { in: userIds } } })

  const leaderboard = aggregation
    .map((entry) => {
      const user = users.find((u) => u.id === entry.userId)
      return {
        userId: entry.userId,
        name: user?.name || 'Unknown',
        totalLeaguePoints: entry._sum.pointsAwarded || 0,
        gamesPlayed: entry._count.sessionId || 0,
        averagePlacement: entry._avg.placement || 0,
      }
    })
    .sort((a, b) => b.totalLeaguePoints - a.totalLeaguePoints)

  // Members Data
  const members = await prisma.groupMember.findMany({
    where: { groupId },
    include: { user: true }
  })
  const memberUsers = members.map(m => m.user)
  const allUsers = await prisma.user.findMany({ orderBy: { name: 'asc' } })

  // History Data
  const sessions = await prisma.session.findMany({
    where: { groupId },
    orderBy: { playedAt: 'desc' },
    include: {
        game: true,
        players: {
            include: { user: true },
            orderBy: { placement: 'asc' }
        }
    }
  })

  const history = sessions.map(session => {
    const winners = session.players.filter(p => p.placement === 1).map(p => p.user.name)
    return {
        id: session.id,
        gameName: session.game.name,
        playedAt: session.playedAt,
        winnerNames: winners
    }
  })

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{group.name}</h1>
            <Link href="/sessions/new">
                <Button>Record Session</Button>
            </Link>
        </div>
        
        <section>
            <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
            <LeaderboardTable data={leaderboard} />
        </section>

        <section>
             <GroupHistory sessions={history} />
        </section>
      </div>

      <div className="space-y-8">
        <GroupMembers groupId={group.id} members={memberUsers} allUsers={allUsers} />
      </div>
    </div>
  )
}
