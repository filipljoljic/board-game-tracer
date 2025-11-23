import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ gameId: string }> }
) {
  const { gameId } = await params
  try {
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        templates: true,
      },
    })
    if (!game) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(game)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch game' }, { status: 500 })
  }
}

