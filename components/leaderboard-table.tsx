"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trophy } from 'lucide-react'

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
      <div className="text-center py-12" data-testid="leaderboard-empty">
        <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Trophy className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No sessions yet</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Record your first game session to start tracking scores and competing for the top spot!
        </p>
        <Button asChild>
          <Link href="/sessions/new">Record Session</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
      <Table data-testid="leaderboard-table" className="min-w-[600px]">
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
              <TableCell>
                <Link href={`/players/${entry.userId}`} className="hover:underline hover:text-primary">
                  {entry.name}
                </Link>
              </TableCell>
              <TableCell className="text-right">{entry.totalLeaguePoints}</TableCell>
              <TableCell className="text-right">{entry.gamesPlayed}</TableCell>
              <TableCell className="text-right">{entry.averagePlacement.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

