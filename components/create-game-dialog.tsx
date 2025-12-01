'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

export function CreateGameDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const createGame = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || isLoading) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      
      if (res.ok) {
        setOpen(false)
        setName('')
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to create game', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!isLoading) setOpen(newOpen)
    }}>
      <DialogTrigger asChild>
        <Button data-testid="create-game-button">Add Game</Button>
      </DialogTrigger>
      <DialogContent data-testid="create-game-dialog">
        <DialogHeader>
          <DialogTitle>Add New Game</DialogTitle>
        </DialogHeader>
        <form onSubmit={createGame} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium">Game Name</label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Catan, Ticket to Ride..."
              data-testid="game-name-input"
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            data-testid="submit-game-button"
            disabled={isLoading || !name.trim()}
          >
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

