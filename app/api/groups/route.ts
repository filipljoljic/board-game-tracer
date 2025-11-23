import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const groups = await prisma.group.findMany()
    return NextResponse.json(groups)
  } catch (error) {
    console.error('Failed to fetch groups:', error)
    return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 })
  }
}

