import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { gameId, name, fields } = body

    // Validate fields is a string (it should be stringified JSON)
    // Or if the client sends object, we stringify it.
    // Let's assume client sends object array, we stringify here.
    // Prisma schema says String.

    const fieldsString = typeof fields === 'string' ? fields : JSON.stringify(fields)

    const template = await prisma.customScoreTemplate.create({
      data: {
        gameId,
        name,
        fields: fieldsString,
      },
    })

    // Invalidate games cache (templates are part of game details)
    revalidateTag('games')
    revalidateTag(`game-${gameId}`)

    return NextResponse.json(template)
  } catch {
    return NextResponse.json({ error: 'Failed to create template' }, { status: 500 })
  }
}

