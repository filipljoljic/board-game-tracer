import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { gameId, templateId, groupId, playedAt, players } = body

    const session = await prisma.session.create({
      data: {
        gameId,
        templateId,
        groupId,
        playedAt: new Date(playedAt),
        players: {
          create: players.map((p: any) => ({
            userId: p.userId,
            rawScore: p.rawScore,
            placement: p.placement,
            pointsAwarded: p.pointsAwarded,
            scoreDetails: typeof p.scoreDetails === 'object' ? JSON.stringify(p.scoreDetails) : p.scoreDetails,
          })),
        },
      },
      include: {
        players: {
          include: { user: true },
        },
        game: true,
      },
    })

    return NextResponse.json(session)
  } catch (error) {
    console.error('Failed to create session:', error)
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const groupId = searchParams.get('groupId')

  try {
    const sessions = await prisma.session.findMany({
      where: groupId ? { groupId } : {},
      include: {
        game: true,
        players: {
          include: { user: true },
        },
      },
      orderBy: { playedAt: 'desc' },
    })
    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Failed to fetch sessions:', error)
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 })
  }
}

