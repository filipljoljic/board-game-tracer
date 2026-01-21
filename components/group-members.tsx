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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface User {
  id: string
  name: string | null
  username: string
}

interface GroupMembersProps {
  groupId: string
  members: User[]
  allUsers: User[]
}

function getDisplayName(user: User): string {
  return user.name || user.username
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
        toast.success('Member added successfully')
        router.refresh()
      } else {
        const error = await res.json()
        toast.error(error.error || 'Failed to add member', {
          description: 'This user may already be in the group'
        })
      }
    } catch {
      toast.error('Failed to add member', {
        description: 'An unexpected error occurred'
      })
    } finally {
      setIsAdding(false)
    }
  }

  const removeMember = async (userId: string) => {
    if (removingId) return

    setRemovingId(userId)
    try {
      const res = await fetch(`/api/groups/${groupId}/members`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
      
      if (res.ok) {
        toast.success('Member removed successfully')
        router.refresh()
      } else {
        toast.error('Failed to remove member', {
          description: 'Please try again or contact support'
        })
      }
    } catch {
      toast.error('Failed to remove member', {
        description: 'An unexpected error occurred'
      })
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
                    <SelectItem key={user.id} value={user.id}>{getDisplayName(user)}</SelectItem>
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
              <span>{getDisplayName(member)}</span>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    disabled={removingId === member.id}
                    aria-label={`Remove ${getDisplayName(member)}`}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove Member</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove {getDisplayName(member)} from this group?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => removeMember(member.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Remove
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </li>
          ))}
          {members.length === 0 && <p className="text-muted-foreground text-sm py-2">No members yet.</p>}
        </ul>
      </CardContent>
    </Card>
  )
}
