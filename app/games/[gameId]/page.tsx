import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { prisma } from '@/lib/db'
import { Plus, Edit } from 'lucide-react'

export default async function GameDetailsPage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      templates: true,
    },
  })

  if (!game) notFound()

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/games" className="text-sm text-muted-foreground hover:underline">
          &larr; Back to Games
        </Link>
        <div className="flex justify-between items-center mt-2">
          <h1 className="text-3xl font-bold">{game.name}</h1>
          <Link href={`/games/${game.id}/templates/new`}>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6">
        <h2 className="text-xl font-semibold">Score Templates</h2>
        {game.templates.length === 0 ? (
          <p className="text-muted-foreground">No templates found. Create one to start tracking detailed scores.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {game.templates.map((template) => {
              // Parse fields to show summary
              let fieldCount = 0
              try {
                const fields = JSON.parse(template.fields as string)
                fieldCount = fields.length
              } catch {}

              return (
                <Card key={template.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{template.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{fieldCount} scoring fields</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/games/${game.id}/templates/${template.id}/edit`} className="w-full">
                      <Button variant="outline" className="w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Template
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

