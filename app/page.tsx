import { auth } from '@/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateGroupDialog } from '@/components/create-group-dialog'
import { HomeStats } from '@/components/home-stats'
import { HomeGroupCard } from '@/components/home-group-card'
import { RecentActivity } from '@/components/recent-activity'
import { ContinueSession } from '@/components/continue-session'
import { getUserQuickStats, getEnrichedUserGroups, getCachedRecentUserSessions } from '@/lib/cache'
import { Dices, Trophy, Users, BarChart3 } from 'lucide-react'

export default async function Home() {
  const session = await auth()
  
  // Unauthenticated state - show landing page
  if (!session?.user?.id) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Dices className="h-12 w-12 text-primary" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Board Game Tracker
              </h1>
              <Trophy className="h-12 w-12 text-yellow-600" />
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Track your victories, settle the debates
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle>Create Groups</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Organize your game nights with friends and track everyone&apos;s progress together
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-yellow-600" />
                  <CardTitle>Track Scores</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Record every session and see who&apos;s winning with detailed leaderboards
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                  <CardTitle>View Statistics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Analyze your performance over time with detailed stats and charts
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Dices className="h-8 w-8 text-purple-600" />
                  <CardTitle>Game Randomizer</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Can&apos;t decide what to play? Let us pick the perfect game for your group
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Sign Up
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Fetch data in parallel for authenticated users
  const [groups, recentSessions, userStats] = await Promise.all([
    getEnrichedUserGroups(session.user.id),
    getCachedRecentUserSessions(session.user.id),
    getUserQuickStats(session.user.id),
  ])

  // Authenticated but no groups - show onboarding
  if (groups.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">
              Welcome, {session.user.name || session.user.username}!
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Track your victories, settle the debates
            </p>
          </div>

          <Card className="text-left">
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Create your first group to start tracking game sessions with your friends.
              </p>
              <CreateGroupDialog />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Authenticated with data - show full dashboard
  const userName = session.user.name || session.user.username || 'there'
  const lastSession = recentSessions[0]

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10 space-y-8">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {userName}!
          </h1>
          <p className="text-muted-foreground">Track your victories, settle the debates</p>
        </div>
        <CreateGroupDialog />
      </div>

      {/* Quick Stats */}
      <HomeStats 
        totalSessions={userStats.totalSessions}
        wins={userStats.wins}
        winRate={userStats.winRate}
        mostPlayedGame={userStats.mostPlayedGame}
      />

      {/* Continue Where You Left Off */}
      {lastSession && (
        <ContinueSession session={lastSession} userId={session.user.id} />
      )}

      {/* Your Groups */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Your Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <HomeGroupCard key={group.id} group={group} />
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <RecentActivity sessions={recentSessions} />
    </div>
  )
}
