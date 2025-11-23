import TemplateEditor from '@/components/template-editor'

export default async function NewTemplatePage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params
  return (
    <div className="container mx-auto py-10">
       <TemplateEditor gameId={gameId} />
    </div>
  )
}

