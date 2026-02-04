import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { prisma } from '@/lib/db'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ templateId: string }> }
) {
  const { templateId } = await params
  try {
    const template = await prisma.customScoreTemplate.findUnique({
      where: { id: templateId },
    })
    if (!template) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(template)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch template' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ templateId: string }> }
) {
  const { templateId } = await params
  try {
    const body = await request.json()
    const { name, fields } = body

    const fieldsString = typeof fields === 'string' ? fields : JSON.stringify(fields)

    const template = await prisma.customScoreTemplate.update({
      where: { id: templateId },
      data: {
        name,
        fields: fieldsString,
      },
    })
    
    // Invalidate games cache (templates are part of game details)
    await Promise.all([
      revalidateTag('games'),
      revalidateTag(`game-${template.gameId}`)
    ])
    
    return NextResponse.json(template)
  } catch {
    return NextResponse.json({ error: 'Failed to update template' }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ templateId: string }> }
) {
  const { templateId } = await params
  try {
    const template = await prisma.customScoreTemplate.delete({
      where: { id: templateId },
    })
    
    // Invalidate games cache (templates are part of game details)
    await Promise.all([
      revalidateTag('games'),
      revalidateTag(`game-${template.gameId}`)
    ])
    
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete template' }, { status: 500 })
  }
}

