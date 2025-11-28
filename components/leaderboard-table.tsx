"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type LeaderboardEntry = {
  userId: string
  name: string
  totalLeaguePoints: number
  gamesPlayed: number
  averagePlacement: number
}

export default function LeaderboardTable({ data }: { data: LeaderboardEntry[] }) {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground" data-testid="leaderboard-empty">
        <p>No sessions recorded yet. Record a session to start tracking scores!</p>
      </div>
    )
  }

  return (
    <Table data-testid="leaderboard-table">
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Player</TableHead>
          <TableHead className="text-right">Points</TableHead>
          <TableHead className="text-right">Games</TableHead>
          <TableHead className="text-right">Avg Place</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((entry, index) => (
          <TableRow key={entry.userId}>
            <TableCell className="font-medium">#{index + 1}</TableCell>
            <TableCell>{entry.name}</TableCell>
            <TableCell className="text-right">{entry.totalLeaguePoints}</TableCell>
            <TableCell className="text-right">{entry.gamesPlayed}</TableCell>
            <TableCell className="text-right">{entry.averagePlacement.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

