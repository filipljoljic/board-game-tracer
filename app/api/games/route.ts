import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: { sessions: true },
        },
      },
    })
    
    // Cache for 1 hour in browser, revalidate in background
    return NextResponse.json(games, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const game = await prisma.game.create({
      data: { name },
    })
    
    // Invalidate games cache for instant visibility
    // Next.js 16 requires second parameter "max" for stale-while-revalidate
    revalidateTag('games', 'max')
    
    return NextResponse.json(game)
  } catch {
    return NextResponse.json({ error: 'Failed to create game' }, { status: 500 })
  }
}
