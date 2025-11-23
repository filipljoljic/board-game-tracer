import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: { sessions: true },
        },
      },
    })
    return NextResponse.json(games)
  } catch (error) {
    console.error('Failed to fetch games:', error)
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 })
  }
}

