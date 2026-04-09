import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { formatDurationMinutes } from '@/lib/duration'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Metadata } from 'next'

/**
 * Dynamic Metadata Generation for Session Pages
 * 
 * Creates descriptive titles showing the game name and date.
 * Example: "Catan Session - Jan 21, 2026 | Board Game Tracker"
 * 
 * This helps users:
 * - Quickly identify sessions in browser history
 * - Share specific session results with meaningful previews
 */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ sessionId: string }> 
}): Promise<Metadata> {
  const { sessionId } = await params
  const session = await prisma.session.findUnique({ 
    where: { id: sessionId },
    select: { 
      playedAt: true,
      game: { select: { name: true } },
      group: { select: { name: true } },
      players: { 
        where: { placement: 1 },
        select: { user: { select: { name: true, username: true } } }
      }
    }
  })

  if (!session) {
    return {
      title: 'Session Not Found',
      description: 'The requested session could not be found.',
    }
  }

  const dateStr = session.playedAt.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
  const winner = session.players[0]?.user?.name || session.players[0]?.user?.username || 'Unknown'

  return {
    title: `${session.game.name} Session - ${dateStr}`,
    description: `${session.game.name} session played on ${dateStr} in ${session.group.name}. Winner: ${winner}. View detailed scores and placements.`,
    openGraph: {
      title: `${session.game.name} Session Results | Board Game Tracker`,
      description: `${session.game.name} played on ${dateStr}. Winner: ${winner}.`,
    },
  }
}

export default async function SessionPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params
  
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      game: true,
      group: true,
      template: true,
      players: {
        include: { user: true },
        orderBy: { placement: 'asc' }
      }
    }
  })

  if (!session) notFound()

  const templateFields = session.template ? JSON.parse(session.template.fields) : []

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{session.game.name}</h1>
        <div className="text-muted-foreground">
            <p>Group: {session.group.name}</p>
            <p>Date: {session.playedAt.toLocaleDateString()} {session.playedAt.toLocaleTimeString()}</p>
            {session.durationMinutes != null && <p>Duration: {formatDurationMinutes(session.durationMinutes)}</p>}
            {session.template && <p>Template: {session.template.name}</p>}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
              <Table className="min-w-[500px]">
                <TableHeader>
                    <TableRow>
                        <TableHead>Placement</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead className="text-right">Raw Score</TableHead>
                        <TableHead className="text-right">League Points</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {session.players.map(player => (
                        <TableRow key={player.id}>
                            <TableCell className="font-medium">
                                {player.placement === 1 && '🏆 '}
                                {player.placement}{getOrdinalSuffix(player.placement)}
                            </TableCell>
                            <TableCell>{player.user.name}</TableCell>
                            <TableCell className="text-right">{player.rawScore}</TableCell>
                            <TableCell className="text-right font-bold">+{player.pointsAwarded}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
            
             {session.template && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>
                    <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
                         <Table className="min-w-[500px]">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Player</TableHead>
                                    {templateFields.map((f: any) => (
                                        <TableHead key={f.key} className="text-right">{f.label}</TableHead>
                                    ))}
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {session.players.map(player => {
                                    const details = player.scoreDetails ? JSON.parse(player.scoreDetails) : {}
                                    return (
                                        <TableRow key={player.id}>
                                            <TableCell className="font-medium">{player.user.name}</TableCell>
                                            {templateFields.map((f: any) => (
                                                <TableCell key={f.key} className="text-right">
                                                    {details[f.key] || 0}
                                                </TableCell>
                                            ))}
                                            <TableCell className="text-right font-bold">{player.rawScore}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}

        </CardContent>
      </Card>
    </div>
  )
}

function getOrdinalSuffix(i: number) {
    const j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return "st";
    }
    if (j == 2 && k != 12) {
        return "nd";
    }
    if (j == 3 && k != 13) {
        return "rd";
    }
    return "th";
}

