import { Button } from '@/components/ui/button'
import LeaderboardTable from '@/components/leaderboard-table'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'

export default async function GroupPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params
  
  const group = await prisma.group.findUnique({ where: { id: groupId } })
  if (!group) notFound()

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

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{group.name} Leaderboard</h1>
        <Link href="/sessions/new">
          <Button>Record Session</Button>
        </Link>
      </div>
      <LeaderboardTable data={leaderboard} />
    </div>
  )
}

