'use client'

import { useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type CollectionStatus, STATUS_LABELS } from '@/components/collection-status-badge'
import { toast } from 'sonner'
import { Heart, Star, BookmarkPlus, X } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function CollectionStatusSelector({ gameId }: { gameId: string }) {
  const { data: collection = [] } = useSWR<{ gameId: string; status: CollectionStatus }[]>('/api/collection', fetcher)
  const [isUpdating, setIsUpdating] = useState(false)
  const [localStatus, setLocalStatus] = useState<CollectionStatus | 'NONE'>('NONE')

  const currentStatus = collection.find(c => c.gameId === gameId)?.status

  useEffect(() => {
    setLocalStatus(currentStatus || 'NONE')
  }, [currentStatus])

  const handleChange = async (value: string) => {
    const newStatus = value === 'NONE' ? null : (value as CollectionStatus)
    setLocalStatus(value as CollectionStatus | 'NONE')
    setIsUpdating(true)

    try {
      const res = await fetch('/api/collection', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, status: newStatus }),
      })
      if (res.ok) {
        await mutate('/api/collection')
        toast.success(newStatus ? `Marked as ${STATUS_LABELS[newStatus]}` : 'Removed from collection')
      } else {
        toast.error('Failed to update collection')
        setLocalStatus(currentStatus || 'NONE')
      }
    } catch {
      toast.error('Failed to update collection')
      setLocalStatus(currentStatus || 'NONE')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Select value={localStatus} onValueChange={handleChange} disabled={isUpdating}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Add to collection" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="OWNED">
          <span className="flex items-center gap-2"><Star className="h-3.5 w-3.5" /> Owned</span>
        </SelectItem>
        <SelectItem value="WISHLIST">
          <span className="flex items-center gap-2"><Heart className="h-3.5 w-3.5" /> Wishlist</span>
        </SelectItem>
        <SelectItem value="WANT_TO_PLAY">
          <span className="flex items-center gap-2"><BookmarkPlus className="h-3.5 w-3.5" /> Want to Play</span>
        </SelectItem>
        <SelectItem value="NONE">
          <span className="flex items-center gap-2 text-muted-foreground"><X className="h-3.5 w-3.5" /> Not in collection</span>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
