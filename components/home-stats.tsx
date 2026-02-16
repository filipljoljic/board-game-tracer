import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Gamepad2, Trophy, TrendingUp, Star } from 'lucide-react'

interface HomeStatsProps {
  totalSessions: number
  wins: number
  winRate: number
  mostPlayedGame: string
}

export function HomeStats({ totalSessions, wins, winRate, mostPlayedGame }: HomeStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
            Sessions Played
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSessions}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-600" />
            Wins (1st)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{wins}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            Win Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{winRate}%</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Star className="h-4 w-4 text-blue-600" />
            Most Played
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-blue-600 truncate" title={mostPlayedGame}>
            {mostPlayedGame}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
