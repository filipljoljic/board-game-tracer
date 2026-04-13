import { Heart, Star, BookmarkPlus } from 'lucide-react'

export type CollectionStatus = 'OWNED' | 'WISHLIST' | 'WANT_TO_PLAY'

export const STATUS_LABELS: Record<CollectionStatus, string> = {
  OWNED: 'Owned',
  WISHLIST: 'Wishlist',
  WANT_TO_PLAY: 'Want to Play',
}

export const STATUS_COLORS: Record<CollectionStatus, string> = {
  OWNED: 'bg-green-100 text-green-700 border-green-300',
  WISHLIST: 'bg-pink-100 text-pink-700 border-pink-300',
  WANT_TO_PLAY: 'bg-blue-100 text-blue-700 border-blue-300',
}

const STATUS_ICONS = {
  OWNED: Star,
  WISHLIST: Heart,
  WANT_TO_PLAY: BookmarkPlus,
}

export function CollectionStatusBadge({ status }: { status: CollectionStatus }) {
  const Icon = STATUS_ICONS[status]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[status]}`}>
      <Icon className="h-3 w-3" />
      {STATUS_LABELS[status]}
    </span>
  )
}
