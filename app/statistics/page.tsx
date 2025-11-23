'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'

interface User {
  id: string
  name: string
}

interface StatsData {
  user: User
  totalGames: number
  summary: {
    wins: number
    second: number
    third: number
    last: number
  }
  pieData: { name: string; value: number; fill: string }[]
  gamesData: { name: string; played: number; wins: number; winRate: number }[]
}

export default function StatisticsPage() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        if (data.length > 0) {
            setSelectedUserId(data[0].id)
        }
      })
  }, [])

  useEffect(() => {
    if (selectedUserId) {
      setLoading(true)
      fetch(`/api/statistics/${selectedUserId}`)
        .then(res => res.json())
        .then(data => setStats(data))
        .finally(() => setLoading(false))
    }
  }, [selectedUserId])

  if (!stats && !loading) return <div className="container mx-auto py-10">Loading...</div>

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Player Statistics</h1>
        <div className="w-[200px]">
          <Select value={selectedUserId} onValueChange={setSelectedUserId}>
            <SelectTrigger>
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

      {stats && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Games</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">{stats.totalGames}</div></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Wins (1st)</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold text-yellow-600">{stats.summary.wins}</div></CardContent>
            </Card>
             <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Win Rate</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                    {stats.totalGames > 0 ? Math.round((stats.summary.wins / stats.totalGames) * 100) : 0}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Last Place</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold text-red-600">{stats.summary.last}</div></CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Placement Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Placement Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stats.pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Games Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Top Games Played</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.gamesData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="played" name="Played" fill="#94a3b8" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="wins" name="Wins" fill="#ffd700" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}

