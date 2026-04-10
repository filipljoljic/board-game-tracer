'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AchievementGrid } from '@/components/achievement-grid'
import { HeadToHead } from '@/components/head-to-head'
import { formatDurationMinutes } from '@/lib/duration'
import { Gamepad2, Trophy, TrendingUp, Flame, Clock, Users, Calendar } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then(r => r.json())

function getOrdinalSuffix(n: number) {
  const j = n % 10, k = n % 100
  if (j === 1 && k !== 11) return 'st'
  if (j === 2 && k !== 12) return 'nd'
  if (j === 3 && k !== 13) return 'rd'
  return 'th'
}

export default function PlayerProfilePage() {
  const { userId } = useParams<{ userId: string }>()
  const [activeTab, setActiveTab] = useState<'achievements' | 'head-to-head' | 'history'>('achievements')

  const { data, isLoading, error } = useSWR(
    userId ? `/api/players/${userId}/profile` : null,
    fetcher
  )

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-muted rounded-lg" />
          <div className="h-64 bg-muted rounded-lg" />
        </div>
      </div>
    )
  }

  if (error || !data || data.error) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-10 text-center">
        <p className="text-muted-foreground">Player not found</p>
      </div>
    )
  }

  const { user, stats, achievements, recentSessions, groups } = data
  const displayName = user.name || user.username
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  // Get unique opponents for head-to-head
  const opponentMap = new Map<string, string>()
  recentSessions.forEach((s: { id: string }) => {
    // We'll fetch opponents from the groups members instead
  })

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shrink-0">
              {initials}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{displayName}</h1>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Member since {memberSince}</span>
                {groups.length > 0 && (
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {groups.map((g: { name: string }) => g.name).join(', ')}</span>
                )}
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-6">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <Gamepad2 className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
              <div className="text-xl font-bold">{stats.totalGames}</div>
              <div className="text-xs text-muted-foreground">Games</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <Trophy className="h-4 w-4 mx-auto mb-1 text-yellow-600" />
              <div className="text-xl font-bold text-yellow-600">{stats.wins}</div>
              <div className="text-xs text-muted-foreground">Wins</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <TrendingUp className="h-4 w-4 mx-auto mb-1 text-green-600" />
              <div className="text-xl font-bold text-green-600">{stats.winRate}%</div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <Flame className="h-4 w-4 mx-auto mb-1 text-orange-500" />
              <div className="text-xl font-bold text-orange-500">{stats.bestStreak}</div>
              <div className="text-xs text-muted-foreground">Best Streak</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <Clock className="h-4 w-4 mx-auto mb-1 text-purple-600" />
              <div className="text-xl font-bold text-purple-600">
                {stats.averageDuration != null ? formatDurationMinutes(stats.averageDuration) : '—'}
              </div>
              <div className="text-xs text-muted-foreground">Avg Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex gap-4" aria-label="Profile tabs">
          {(['achievements', 'head-to-head', 'history'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium whitespace-nowrap border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'head-to-head' ? 'Head-to-Head' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'achievements' && (
        <AchievementGrid
          unlocked={achievements.unlocked}
          locked={achievements.locked}
          total={achievements.total}
          unlockedCount={achievements.unlockedCount}
        />
      )}

      {activeTab === 'head-to-head' && (
        <HeadToHeadTab userId={userId} />
      )}

      {activeTab === 'history' && (
        <div className="space-y-3">
          {recentSessions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No games played yet</p>
          ) : (
            recentSessions.map((s: { id: string; gameName: string; playedAt: string; placement: number; playerCount: number; rawScore: number; durationMinutes: number | null }) => (
              <Link key={s.id} href={`/sessions/${s.id}`} className="block">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-3 border rounded hover:bg-accent transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{s.gameName}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(s.playedAt).toLocaleDateString()}
                      {s.durationMinutes != null && ` · ${formatDurationMinutes(s.durationMinutes)}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className={`font-semibold ${s.placement === 1 ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                      {s.placement === 1 ? 'Winner' : `${s.placement}${getOrdinalSuffix(s.placement)}`}
                    </span>
                    <span className="text-muted-foreground">{s.rawScore} pts</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}

function HeadToHeadTab({ userId }: { userId: string }) {
  // Fetch opponents list from the user's groups
  const { data: opponents = [] } = useSWR<{ id: string; name: string }[]>(
    `/api/players/${userId}/opponents`,
    fetcher,
    { fallbackData: [] }
  )

  return <HeadToHead userId={userId} opponents={opponents} />
}
