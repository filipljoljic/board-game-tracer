import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { getCachedGame, getGame } from '@/lib/cache'
import { Plus, Edit } from 'lucide-react'
import { Metadata } from 'next'
import { CollectionStatusSelector } from '@/components/collection-status-selector'

/**
 * Dynamic Metadata Generation for Game Detail Pages
 * 
 * Generates unique titles and descriptions for each game page.
 * This helps with:
 * - Search engine indexing (each game has unique metadata)
 * - Social sharing (sharing Catan page shows "Catan" not "Game")
 * - User experience in browser tabs
 */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ gameId: string }> 
}): Promise<Metadata> {
  const { gameId } = await params
  // Use React.cache for metadata generation (per-request deduplication)
  const game = await getGame(gameId)

  if (!game) {
    return {
      title: 'Game Not Found',
      description: 'The requested game could not be found.',
    }
  }

  return {
    title: game.name,
    description: `Manage scoring templates for ${game.name}. ${game.templates.length} templates available.`,
    openGraph: {
      title: `${game.name} | Board Game Tracker`,
      description: `Manage scoring templates and view sessions for ${game.name}.`,
    },
  }
}

export default async function GameDetailsPage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params
  // Use cached game query with React.cache for per-request deduplication
  // This shares the query with generateMetadata above
  const game = await getGame(gameId)

  if (!game) notFound()

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">
      <div className="mb-6">
        <Link href="/games" className="text-sm text-muted-foreground hover:underline">
          &larr; Back to Games
        </Link>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-2">
          <h1 className="text-2xl md:text-3xl font-bold">{game.name}</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <CollectionStatusSelector gameId={game.id} />
            <Link href={`/games/${game.id}/templates/new`} className="w-full md:w-auto">
              <Button className="w-full md:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                New Template
              </Button>
            </Link>
          </div>
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

