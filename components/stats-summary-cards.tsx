import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDurationMinutes } from '@/lib/duration'

interface StatsSummaryCardsProps {
  totalGames: number
  wins: number
  last: number
  averageDuration?: number | null
}

export function StatsSummaryCards({ totalGames, wins, last, averageDuration }: StatsSummaryCardsProps) {
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Games</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalGames}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Wins (1st)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{wins}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{winRate}%</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Last Place</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{last}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Avg Game Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {averageDuration != null ? formatDurationMinutes(averageDuration) : '—'}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
