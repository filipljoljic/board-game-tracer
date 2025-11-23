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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const game = await prisma.game.create({
      data: { name },
    })
    return NextResponse.json(game)
  } catch (error) {
    console.error('Failed to create game:', error)
    return NextResponse.json({ error: 'Failed to create game' }, { status: 500 })
  }
}
