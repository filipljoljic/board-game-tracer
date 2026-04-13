import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

const VALID_STATUSES = ['OWNED', 'WISHLIST', 'WANT_TO_PLAY'] as const
type Status = typeof VALID_STATUSES[number]

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const collection = await prisma.gameCollection.findMany({
      where: { userId: session.user.id },
      select: { gameId: true, status: true },
    })
    return NextResponse.json(collection)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { gameId, status } = await request.json()

    if (!gameId) {
      return NextResponse.json({ error: 'gameId is required' }, { status: 400 })
    }

    // status === null means remove from collection
    if (status === null) {
      await prisma.gameCollection.deleteMany({
        where: { userId: session.user.id, gameId },
      })
    } else {
      if (!VALID_STATUSES.includes(status as Status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
      }

      await prisma.gameCollection.upsert({
        where: { userId_gameId: { userId: session.user.id, gameId } },
        update: { status },
        create: { userId: session.user.id, gameId, status },
      })
    }

    revalidateTag(`user-${session.user.id}-collection`, 'max')
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update collection' }, { status: 500 })
  }
}
