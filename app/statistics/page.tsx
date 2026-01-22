'use client'

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useSWR from 'swr'
import { StatsSummaryCards } from '@/components/stats-summary-cards'
import { PlacementChart } from '@/components/placement-chart'
import { GamesChart } from '@/components/games-chart'
import { StatsSkeleton } from '@/components/stats-skeleton'

interface User {
  id: string
  name: string
}

interface Group {
  id: string
  name: string
}

interface StatsData {
  user: User
  group?: Group
  totalGames: number
  summary: {
    wins: number
    second: number
    third: number
    last: number
  }
  pieData: { name: string; value: number; fill: string }[]
  gamesData: { name: string; played: number; wins: number; winRate: number }[]
  groups?: Group[]
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function StatisticsPage() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [activeTab, setActiveTab] = useState<string>('all')

  // Fetch users list
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        const usersArray = Array.isArray(data) ? data : []
        setUsers(usersArray)
        if (usersArray.length > 0) {
          setSelectedUserId(usersArray[0].id)
        }
      })
      .catch(() => {
        setUsers([])
      })
  }, [])

  // Fetch overall statistics using SWR
  const { data: stats, isLoading: isLoadingStats } = useSWR<StatsData>(
    selectedUserId ? `/api/statistics/${selectedUserId}` : null,
    fetcher
  )

  // Fetch group-specific statistics using SWR
  const { data: groupStats, isLoading: isLoadingGroupStats } = useSWR<StatsData>(
    selectedUserId && activeTab !== 'all' ? `/api/statistics/${selectedUserId}/groups/${activeTab}` : null,
    fetcher
  )

  const displayStats = activeTab === 'all' ? stats : groupStats
  const isLoading = activeTab === 'all' ? isLoadingStats : isLoadingGroupStats

  return (
    <main className="container mx-auto px-4 md:px-6 py-6 md:py-10 space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Player Statistics</h1>
        <div className="w-full md:w-[200px]">
          <Select value={selectedUserId} onValueChange={setSelectedUserId}>
            <SelectTrigger data-testid="user-select">
              <SelectValue placeholder="Select player" />
            </SelectTrigger>
            <SelectContent>
              {users.map(user => (
                <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs for All Groups and Individual Groups */}
      {stats?.groups && stats.groups.length > 0 && (
        <div className="border-b border-border">
          <nav className="flex gap-4 overflow-x-auto" aria-label="Statistics tabs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'all'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              All Groups
            </button>
            {stats.groups.map(group => (
              <button
                key={group.id}
                onClick={() => setActiveTab(group.id)}
                className={`px-4 py-2 font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === group.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {group.name}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="py-4">
          <StatsSkeleton />
        </div>
      )}

      {/* Empty States */}
      {!isLoading && !displayStats && users.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No users found. Create some users to view statistics.</p>
        </div>
      )}

      {!isLoading && !displayStats && users.length > 0 && !selectedUserId && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Select a player to view their statistics.</p>
        </div>
      )}

      {!isLoading && displayStats && displayStats.totalGames === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            No games played yet {activeTab !== 'all' && displayStats.group ? `in ${displayStats.group.name}` : ''}.
          </p>
        </div>
      )}

      {/* Statistics Display */}
      {displayStats && !isLoading && displayStats.totalGames > 0 && (
        <>
          {/* Summary Cards */}
          <StatsSummaryCards
            totalGames={displayStats.totalGames}
            wins={displayStats.summary.wins}
            last={displayStats.summary.last}
          />

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PlacementChart data={displayStats.pieData} />
            <GamesChart data={displayStats.gamesData} />
          </div>
        </>
      )}
    </main>
  )
}
