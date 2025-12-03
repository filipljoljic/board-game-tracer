'use client'

import * as React from 'react'
import { Shuffle, Plus, X, Dices, RotateCcw } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const ordinalSuffix = (n: number): string => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

interface RandomizedPlayer {
  name: string
  position: number
}

export function RandomizerDialog() {
  const [open, setOpen] = React.useState(false)
  const [players, setPlayers] = React.useState<string[]>(['', ''])
  const [newPlayerName, setNewPlayerName] = React.useState('')
  const [randomizedOrder, setRandomizedOrder] = React.useState<RandomizedPlayer[]>([])
  const [isShuffling, setIsShuffling] = React.useState(false)
  const [revealedCount, setRevealedCount] = React.useState(0)

  const validPlayers = players.filter((p) => p.trim() !== '')
  const canShuffle = validPlayers.length >= 2

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...players]
    newPlayers[index] = value
    setPlayers(newPlayers)
  }

  const addPlayer = () => {
    setPlayers([...players, ''])
  }

  const removePlayer = (index: number) => {
    if (players.length > 2) {
      const newPlayers = players.filter((_, i) => i !== index)
      setPlayers(newPlayers)
    }
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const handleShuffle = async () => {
    if (!canShuffle) return

    setIsShuffling(true)
    setRevealedCount(0)
    setRandomizedOrder([])

    // Shuffle animation delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    const shuffled = shuffleArray(validPlayers)
    const result = shuffled.map((name, index) => ({
      name,
      position: index + 1,
    }))

    setRandomizedOrder(result)
    setIsShuffling(false)

    // Reveal players one by one
    for (let i = 0; i < result.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 400))
      setRevealedCount((prev) => prev + 1)
    }
  }

  const handleReset = () => {
    setRandomizedOrder([])
    setRevealedCount(0)
  }

  const handleClearAll = () => {
    setPlayers(['', ''])
    setRandomizedOrder([])
    setRevealedCount(0)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="hover:text-primary inline-flex items-center gap-1.5 text-sm font-medium">
          <Dices className="size-4" />
          Randomizer
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Dices className="size-5" />
            Turn Order Randomizer
          </DialogTitle>
          <DialogDescription>
            Add player names and shuffle to decide who goes first!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Player Inputs */}
          {randomizedOrder.length === 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Players</span>
                <span className="text-xs text-muted-foreground">
                  {validPlayers.length} player{validPlayers.length !== 1 ? 's' : ''} added
                </span>
              </div>

              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                {players.map((player, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {index + 1}
                    </div>
                    <Input
                      placeholder={`Player ${index + 1}`}
                      value={player}
                      onChange={(e) => handlePlayerChange(index, e.target.value)}
                      className="flex-1"
                    />
                    {players.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removePlayer(index)}
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="size-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPlayer}
                className="w-full"
              >
                <Plus className="size-4" />
                Add Player
              </Button>
            </div>
          )}

          {/* Shuffle Button */}
          {randomizedOrder.length === 0 && (
            <Button
              onClick={handleShuffle}
              disabled={!canShuffle || isShuffling}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
            >
              {isShuffling ? (
                <>
                  <Shuffle className="size-4 animate-spin" />
                  Shuffling...
                </>
              ) : (
                <>
                  <Shuffle className="size-4" />
                  Shuffle Order
                </>
              )}
            </Button>
          )}

          {!canShuffle && randomizedOrder.length === 0 && (
            <p className="text-xs text-center text-muted-foreground">
              Add at least 2 players to shuffle
            </p>
          )}

          {/* Results */}
          {randomizedOrder.length > 0 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Turn Order
                </h3>
              </div>

              <div className="space-y-2">
                {randomizedOrder.map((player, index) => {
                  const isRevealed = index < revealedCount
                  const isFirst = player.position === 1

                  return (
                    <div
                      key={index}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg border transition-all duration-300',
                        isRevealed
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2',
                        isFirst && isRevealed
                          ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 dark:from-amber-950/30 dark:to-yellow-950/30 dark:border-amber-800'
                          : 'bg-muted/30'
                      )}
                      style={{
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      <div
                        className={cn(
                          'flex size-8 items-center justify-center rounded-full text-sm font-bold',
                          isFirst
                            ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-lg shadow-amber-200 dark:shadow-amber-900'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {player.position}
                      </div>
                      <div className="flex-1">
                        <p
                          className={cn(
                            'font-medium',
                            isFirst && 'text-amber-700 dark:text-amber-400'
                          )}
                        >
                          {player.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {ordinalSuffix(player.position)} to play
                          {isFirst && ' 🎯'}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Action Buttons */}
              {revealedCount >= randomizedOrder.length && (
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="flex-1"
                  >
                    <RotateCcw className="size-4" />
                    Edit Players
                  </Button>
                  <Button
                    onClick={handleShuffle}
                    className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                  >
                    <Shuffle className="size-4" />
                    Shuffle Again
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

