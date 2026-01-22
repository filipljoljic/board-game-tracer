import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface GamesChartProps {
  data: { name: string; played: number; wins: number; winRate: number }[]
}

export function GamesChart({ data }: GamesChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Games Played</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
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
  )
}
