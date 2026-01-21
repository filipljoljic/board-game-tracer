'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { toast } from 'sonner'

interface User {
  id: string
  name: string
  email?: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      // Ensure data is an array before setting
      setUsers(Array.isArray(data) ? data : [])
    } catch {
      // Silently handle error - users will see empty list
      setUsers([])
    } finally {
        setLoading(false)
    }
  }

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, email: newEmail }),
      })
      if (res.ok) {
        setNewName('')
        setNewEmail('')
        toast.success('User added successfully')
        fetchUsers()
      } else {
        toast.error('Failed to add user', {
          description: 'Please try again or contact support'
        })
      }
    } catch {
      toast.error('Failed to add user', {
        description: 'An unexpected error occurred'
      })
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        toast.success('User deleted successfully')
        fetchUsers()
      } else {
        const error = await res.json()
        toast.error(error.error || 'Failed to delete user', {
          description: 'Please try again or contact support'
        })
      }
    } catch {
      toast.error('Failed to delete user', {
        description: 'An unexpected error occurred'
      })
    }
  }

  if (loading) return <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">Loading...</div>

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Manage Users</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addUser} className="flex flex-col md:flex-row gap-4 md:items-end">
            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                Name <span className="text-destructive">*</span>
              </label>
              <Input 
                id="name" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                placeholder="John Doe"
                required
                aria-required="true"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="email" className="text-sm font-medium">Email (Optional)</label>
              <Input 
                id="email" 
                value={newEmail} 
                onChange={(e) => setNewEmail(e.target.value)} 
                placeholder="john@example.com"
              />
            </div>
            <Button type="submit" className="w-full md:w-auto">Add User</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="font-semibold">{user.name}</p>
                {user.email && <p className="text-sm text-muted-foreground">{user.email}</p>}
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon" aria-label={`Delete ${user.name}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete User</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete {user.name}? This action cannot be undone and will permanently remove all their data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteUser(user.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

