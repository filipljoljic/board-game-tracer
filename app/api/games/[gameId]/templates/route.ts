import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ gameId: string }> }
) {
  const { gameId } = await params
  try {
    const templates = await prisma.customScoreTemplate.findMany({
      where: { gameId },
    })
    return NextResponse.json(templates)
  } catch (error) {
    console.error('Failed to fetch templates:', error)
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 })
  }
}

