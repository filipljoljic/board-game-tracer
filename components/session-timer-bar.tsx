"use client"

import { useState, useEffect } from 'react'
import { useSessionTimer, formatDuration } from '@/lib/use-session-timer'
import { Button } from '@/components/ui/button'
import { Timer, Pause, Play, Square } from 'lucide-react'

export function SessionTimerBar({ onStop }: { onStop?: (minutes: number) => void }) {
  const { isActive, isPaused, displayMs, stop, pause, resume, discard } = useSessionTimer()

  if (!isActive) return null

  const handleStop = () => {
    const minutes = stop()
    onStop?.(minutes)
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-foreground rounded-full px-4 py-2 shadow-lg flex items-center gap-3">
      <Timer className="h-4 w-4" />
      <span className="font-mono text-sm font-bold min-w-[70px]">
        {formatDuration(displayMs)}
      </span>
      {isPaused ? (
        <Button size="icon" variant="ghost" className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20" onClick={resume}>
          <Play className="h-3.5 w-3.5" />
        </Button>
      ) : (
        <Button size="icon" variant="ghost" className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20" onClick={pause}>
          <Pause className="h-3.5 w-3.5" />
        </Button>
      )}
      <Button size="icon" variant="ghost" className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20" onClick={handleStop}>
        <Square className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}

export function GlobalTimerBar() {
  const [mounted, setMounted] = useState(false)
  const { isActive, isPaused, displayMs, pause, resume, discard } = useSessionTimer()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isActive) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-foreground rounded-full px-4 py-2 shadow-lg flex items-center gap-3">
      <Timer className="h-4 w-4 animate-pulse" />
      <span className="font-mono text-sm font-bold min-w-[70px]">
        {formatDuration(displayMs)}
      </span>
      {isPaused ? (
        <Button size="icon" variant="ghost" className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20" onClick={resume}>
          <Play className="h-3.5 w-3.5" />
        </Button>
      ) : (
        <Button size="icon" variant="ghost" className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20" onClick={pause}>
          <Pause className="h-3.5 w-3.5" />
        </Button>
      )}
      <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:bg-primary-foreground/20" onClick={discard} title="Discard timer">
        <Square className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}
