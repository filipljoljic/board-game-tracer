import TemplateEditor from '@/components/template-editor'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'

export default async function EditTemplatePage({ params }: { params: Promise<{ gameId: string, templateId: string }> }) {
  const { gameId, templateId } = await params
  
  const template = await prisma.customScoreTemplate.findUnique({
    where: { id: templateId },
  })

  if (!template) notFound()

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">
       <TemplateEditor 
         gameId={gameId} 
         initialData={{
           id: template.id,
           name: template.name,
           fields: template.fields as string
         }} 
       />
    </div>
  )
}

