'use client'

import { useState } from 'react'
import { type ComputedAchievement, type AchievementTier, TIER_COLORS } from '@/lib/achievements'
import { Lock, Footprints, Sprout, Calendar, Flame, Medal, Crown, Trophy, Zap, Rocket, Sword, Shield, Compass, Library, Gem, Users, HeartHandshake, Swords, Target, RotateCcw, Timer, Moon, HelpCircle } from 'lucide-react'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Footprints, Sprout, Calendar, Flame, Medal, Crown, Trophy, Zap, Rocket,
  Sword, Shield, Compass, Library, Gem, Users, HeartHandshake, Swords,
  Target, RotateCcw, Timer, Moon,
}

const TIER_LABELS: Record<AchievementTier, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
}

const TIER_DOT_COLORS: Record<AchievementTier, string> = {
  common: 'bg-gray-400',
  uncommon: 'bg-green-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500',
}

function getIcon(iconName: string) {
  return ICON_MAP[iconName] || HelpCircle
}

export function AchievementBadge({ achievement }: { achievement: ComputedAchievement }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const Icon = getIcon(achievement.icon)
  const tierClass = TIER_COLORS[achievement.tier]
  const progressPct = achievement.progress.target > 0
    ? Math.round((achievement.progress.current / achievement.progress.target) * 100)
    : 0

  const tooltip = (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-52 p-3 bg-popover text-popover-foreground rounded-lg border shadow-md text-left pointer-events-none">
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-2 h-2 rounded-full ${TIER_DOT_COLORS[achievement.tier]}`} />
        <span className="text-xs font-medium text-muted-foreground">{TIER_LABELS[achievement.tier]}</span>
      </div>
      <p className="text-sm font-semibold mb-0.5">{achievement.name}</p>
      <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
      {achievement.unlocked ? (
        <span className="text-xs font-medium text-green-600">Unlocked</span>
      ) : (
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{achievement.progress.current}/{achievement.progress.target}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      )}
      {/* Arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
        <div className="w-2.5 h-2.5 bg-popover border-r border-b rotate-45 -translate-y-1.5" />
      </div>
    </div>
  )

  if (!achievement.unlocked) {
    return (
      <div
        className="relative flex flex-col items-center gap-1.5 p-3 rounded-lg border border-dashed border-muted-foreground/30 opacity-60 hover:opacity-80 transition-opacity cursor-default"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {showTooltip && tooltip}
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>
        <span className="text-xs font-medium text-center text-muted-foreground">{achievement.name}</span>
        {achievement.progress.target > 1 && (
          <div className="w-full bg-muted rounded-full h-1">
            <div className="bg-muted-foreground/40 h-1 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={`relative flex flex-col items-center gap-1.5 p-3 rounded-lg border hover:shadow-md transition-shadow cursor-default ${tierClass}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && tooltip}
      <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-xs font-medium text-center">{achievement.name}</span>
    </div>
  )
}
