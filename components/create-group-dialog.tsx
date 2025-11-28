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

export function CreateGroupDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const router = useRouter()

  const createGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    try {
      const res = await fetch('/api/groups', {
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
      console.error('Failed to create group', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="create-group-button">Create Group</Button>
      </DialogTrigger>
      <DialogContent data-testid="create-group-dialog">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
        </DialogHeader>
        <form onSubmit={createGroup} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium">Group Name</label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Board Game Night"
              data-testid="group-name-input"
            />
          </div>
          <Button type="submit" className="w-full" data-testid="submit-group-button">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

