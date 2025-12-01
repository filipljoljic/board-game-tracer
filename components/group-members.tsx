'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
}

interface GroupMembersProps {
  groupId: string
  members: User[]
  allUsers: User[]
}

export function GroupMembers({ groupId, members, allUsers }: GroupMembersProps) {
  const [open, setOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const router = useRouter()

  const addMember = async () => {
    if (!selectedUserId || isAdding) return

    setIsAdding(true)
    try {
      const res = await fetch(`/api/groups/${groupId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUserId }),
      })
      
      if (res.ok) {
        setOpen(false)
        setSelectedUserId('')
        router.refresh()
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to add member')
      }
    } catch (error) {
      console.error('Failed to add member', error)
    } finally {
      setIsAdding(false)
    }
  }

  const removeMember = async (userId: string) => {
    if (!confirm('Remove this member?')) return
    if (removingId) return

    setRemovingId(userId)
    try {
      const res = await fetch(`/api/groups/${groupId}/members`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
      
      if (res.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to remove member', error)
    } finally {
      setRemovingId(null)
    }
  }
  
  const availableUsers = allUsers.filter(u => !members.some(m => m.id === u.id))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Members</CardTitle>
        <Dialog open={open} onOpenChange={(newOpen) => {
          if (!isAdding) setOpen(newOpen)
        }}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">Add</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Select value={selectedUserId} onValueChange={setSelectedUserId} disabled={isAdding}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {availableUsers.map(user => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addMember} className="w-full" disabled={!selectedUserId || isAdding}>
                {isAdding ? 'Adding...' : 'Add Member'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {members.map(member => (
            <li key={member.id} className="flex justify-between items-center p-2 rounded hover:bg-accent/50 text-sm">
              <span>{member.name}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => removeMember(member.id)}
                disabled={removingId === member.id}
              >
                 <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
              </Button>
            </li>
          ))}
          {members.length === 0 && <p className="text-muted-foreground text-sm py-2">No members yet.</p>}
        </ul>
      </CardContent>
    </Card>
  )
}

