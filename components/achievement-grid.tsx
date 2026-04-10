import { type ComputedAchievement } from '@/lib/achievements'
import { AchievementBadge } from '@/components/achievement-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AchievementGridProps {
  unlocked: ComputedAchievement[]
  locked: ComputedAchievement[]
  total: number
  unlockedCount: number
}

export function AchievementGrid({ unlocked, locked, total, unlockedCount }: AchievementGridProps) {
  const progressPct = total > 0 ? Math.round((unlockedCount / total) * 100) : 0

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{unlockedCount}/{total} Achievements Unlocked</span>
            <span className="text-sm text-muted-foreground">{progressPct}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {unlocked.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Unlocked</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {unlocked.map(a => (
              <AchievementBadge key={a.id} achievement={a} />
            ))}
          </div>
        </div>
      )}

      {locked.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Locked</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {locked.map(a => (
              <AchievementBadge key={a.id} achievement={a} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
