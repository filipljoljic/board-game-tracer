'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string | null
  username: string
}

export function CreateGroupDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  const router = useRouter()

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setName('')
      setSelectedMemberIds([])
    }
  }, [open])

  // Fetch users when dialog opens
  useEffect(() => {
    if (open) {
      setLoadingUsers(true)
      fetch('/api/users')
        .then(res => res.json())
        .then(data => {
          setUsers(data)
        })
        .catch(err => console.error('Failed to fetch users', err))
        .finally(() => setLoadingUsers(false))
    }
  }, [open])

  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (!isLoading) {
      setOpen(newOpen)
    }
  }, [isLoading])

  const toggleMember = (userId: string) => {
    setSelectedMemberIds(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const createGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || isLoading) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, memberIds: selectedMemberIds }),
      })
      
      if (res.ok) {
        setOpen(false)
        setName('')
        setSelectedMemberIds([])
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to create group', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getDisplayName = (user: User) => user.name || user.username

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button data-testid="create-group-button">Create Group</Button>
      </DialogTrigger>
      <DialogContent data-testid="create-group-dialog" className="max-h-[80vh] overflow-y-auto">
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
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Add Members</label>
            <p className="text-xs text-muted-foreground mb-2">You will be added as admin automatically</p>
            {loadingUsers ? (
              <p className="text-sm text-muted-foreground py-2">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="text-sm text-muted-foreground py-2">No other users available</p>
            ) : (
              <div className="border rounded-md max-h-48 overflow-y-auto">
                {users.map(user => (
                  <div 
                    key={user.id} 
                    className="flex items-center space-x-2 p-2 hover:bg-accent/50 cursor-pointer"
                    onClick={() => toggleMember(user.id)}
                  >
                    <Checkbox 
                      id={`user-${user.id}`}
                      checked={selectedMemberIds.includes(user.id)}
                      onCheckedChange={() => toggleMember(user.id)}
                      disabled={isLoading}
                    />
                    <label 
                      htmlFor={`user-${user.id}`} 
                      className="text-sm cursor-pointer flex-1"
                    >
                      {getDisplayName(user)}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            data-testid="submit-group-button"
            disabled={isLoading || !name.trim()}
          >
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

