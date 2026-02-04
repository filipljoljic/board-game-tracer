import { Button } from '@/components/ui/button'
import LeaderboardTable from '@/components/leaderboard-table'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { GroupMembers } from '@/components/group-members'
import { GroupHistory } from '@/components/group-history'
import { Metadata } from 'next'
import { getGroup, getCachedGroupLeaderboard, getCachedGroupSessions } from '@/lib/cache'

/**
 * Dynamic Metadata Generation
 * 
 * This function generates page-specific metadata for each group.
 * Instead of generic "Group | Board Game Tracker", users see
 * "Friday Night Gaming | Board Game Tracker" in search results.
 * 
 * Why this matters:
 * - More relevant search results = higher click-through rate
 * - Better social sharing previews
 * - Search engines understand the page is about a specific group
 */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ groupId: string }> 
}): Promise<Metadata> {
  const { groupId } = await params
  // Use React.cache for metadata (per-request deduplication)
  const group = await getGroup(groupId)

  if (!group) {
    return {
      title: 'Group Not Found',
      description: 'The requested group could not be found.',
    }
  }

  return {
    title: group.name,
    description: `View the leaderboard, game sessions, and members of ${group.name}. Track scores and see who's winning!`,
    openGraph: {
      title: `${group.name} | Board Game Tracker`,
      description: `View the leaderboard, game sessions, and members of ${group.name}.`,
    },
  }
}

export default async function GroupPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params
  
  // Use React.cache for group details (shares with generateMetadata)
  const group = await getGroup(groupId)
  if (!group) notFound()

  // Fetch leaderboard, members, and sessions in parallel (Vercel best practice)
  const [leaderboard, members, allUsers, sessions] = await Promise.all([
    // Cached leaderboard (30 min TTL, invalidated on session create)
    getCachedGroupLeaderboard(groupId),
    
    // Members data
    prisma.groupMember.findMany({
      where: { groupId },
      include: { 
        user: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    }),
    
    // All users for member management
    prisma.user.findMany({ 
      select: {
        id: true,
        name: true,
        username: true
      },
      orderBy: { username: 'asc' } 
    }),
    
    // Cached sessions (15 min TTL, invalidated on session create)
    getCachedGroupSessions(groupId)
  ])

  const memberUsers = members.map(m => m.user)

  // Transform leaderboard data for component
  const leaderboardData = leaderboard.map(entry => ({
    userId: entry.userId,
    name: entry.userName,
    totalLeaguePoints: entry.totalPoints,
    gamesPlayed: entry.gamesPlayed,
    averagePlacement: entry.averagePlacement
  }))

  // Transform sessions for history component
  const history = sessions.map(session => {
    const winners = session.players.filter(p => p.placement === 1).map(p => p.user.name || p.user.username)
    return {
        id: session.id,
        gameName: session.game.name,
        playedAt: session.playedAt,
        winnerNames: winners
    }
  })

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      <div className="lg:col-span-2 space-y-6 md:space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">{group.name}</h1>
            <Link href="/sessions/new" className="w-full md:w-auto">
                <Button className="w-full md:w-auto">Record Session</Button>
            </Link>
        </div>
        
        <section>
            <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
            <LeaderboardTable data={leaderboardData} />
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
