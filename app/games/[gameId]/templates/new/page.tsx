import TemplateEditor from '@/components/template-editor'

export default async function NewTemplatePage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params
  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">
       <TemplateEditor gameId={gameId} />
    </div>
  )
}

