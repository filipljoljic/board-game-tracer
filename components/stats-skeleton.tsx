import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function StatsSkeleton() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 w-32 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="w-full h-full bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
