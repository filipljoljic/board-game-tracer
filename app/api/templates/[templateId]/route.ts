import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ templateId: string }> }
) {
  const { templateId } = await params
  try {
    const template = await prisma.customScoreTemplate.findUnique({
      where: { id: templateId },
    })
    if (!template) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(template)
  } catch (error) {
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
    return NextResponse.json(template)
  } catch (error) {
    console.error('Failed to update template:', error)
    return NextResponse.json({ error: 'Failed to update template' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ templateId: string }> }
) {
  const { templateId } = await params
  try {
    await prisma.customScoreTemplate.delete({
      where: { id: templateId },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete template' }, { status: 500 })
  }
}

