'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { X } from 'lucide-react'

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
          setUsers(Array.isArray(data) ? data : [])
        })
        .catch(() => {
          setUsers([])
        })
        .finally(() => setLoadingUsers(false))
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, isLoading])

  const toggleMember = useCallback((userId: string) => {
    setSelectedMemberIds(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }, [])

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
        toast.success('Group created successfully')
        router.refresh()
      } else {
        toast.error('Failed to create group', {
          description: 'Please try again or contact support'
        })
      }
    } catch {
      toast.error('Failed to create group', {
        description: 'An unexpected error occurred'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getDisplayName = (user: User) => user.name || user.username

  return (
    <>
      <Button data-testid="create-group-button" onClick={() => setOpen(true)}>
        Create Group
      </Button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => !isLoading && setOpen(false)}
          />

          {/* Content */}
          <div className="fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] sm:max-w-lg">
            <div
              data-testid="create-group-dialog"
              className="bg-background rounded-lg border p-6 shadow-lg max-h-[80vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Create New Group</h2>
                <button
                  onClick={() => !isLoading && setOpen(false)}
                  className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={createGroup} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">
                    Group Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Board Game Night"
                    data-testid="group-name-input"
                    disabled={isLoading}
                    required
                    aria-required="true"
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
                          <div className={`h-4 w-4 rounded-sm border flex items-center justify-center shrink-0 ${
                            selectedMemberIds.includes(user.id)
                              ? 'bg-primary border-primary text-primary-foreground'
                              : 'border-input'
                          }`}>
                            {selectedMemberIds.includes(user.id) && (
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M8.5 2.5L3.5 7.5L1.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span className="text-sm cursor-pointer flex-1">
                            {getDisplayName(user)}
                          </span>
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
            </div>
          </div>
        </div>
      )}
    </>
  )
}
