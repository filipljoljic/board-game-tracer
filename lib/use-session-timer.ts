"use client"

import { useState, useEffect, useCallback, useRef } from 'react'

const STORAGE_KEY = 'bgt-session-timer'

interface TimerState {
  isRunning: boolean
  startedAt: number
  elapsed: number
  pausedAt: number | null
  gameId: string
  groupId: string
}

function loadTimer(): TimerState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveTimer(state: TimerState | null) {
  if (typeof window === 'undefined') return
  if (!state) {
    localStorage.removeItem(STORAGE_KEY)
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }
}

function getElapsed(state: TimerState): number {
  if (!state.isRunning || state.pausedAt) {
    return state.elapsed
  }
  return state.elapsed + (Date.now() - state.startedAt)
}

export function useSessionTimer() {
  const timerRef = useRef<TimerState | null>(null)
  const [displayMs, setDisplayMs] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTick = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTick = useCallback(() => {
    clearTick()
    intervalRef.current = setInterval(() => {
      if (timerRef.current) {
        setDisplayMs(getElapsed(timerRef.current))
      }
    }, 1000)
  }, [clearTick])

  // Load on mount
  useEffect(() => {
    const saved = loadTimer()
    if (saved) {
      timerRef.current = saved
      setIsActive(true)
      setIsPaused(!!saved.pausedAt)
      setDisplayMs(getElapsed(saved))
      if (saved.isRunning && !saved.pausedAt) {
        startTick()
      }
    }
    return clearTick
  }, [startTick, clearTick])

  const start = useCallback((gameId: string, groupId: string) => {
    const state: TimerState = {
      isRunning: true,
      startedAt: Date.now(),
      elapsed: 0,
      pausedAt: null,
      gameId,
      groupId,
    }
    timerRef.current = state
    saveTimer(state)
    setIsActive(true)
    setIsPaused(false)
    setDisplayMs(0)
    startTick()
  }, [startTick])

  const pause = useCallback(() => {
    const t = timerRef.current
    if (!t || !t.isRunning || t.pausedAt) return
    const updated: TimerState = {
      ...t,
      elapsed: getElapsed(t),
      pausedAt: Date.now(),
    }
    timerRef.current = updated
    saveTimer(updated)
    setIsPaused(true)
    setDisplayMs(updated.elapsed)
    clearTick()
  }, [clearTick])

  const resume = useCallback(() => {
    const t = timerRef.current
    if (!t || !t.pausedAt) return
    const updated: TimerState = {
      ...t,
      startedAt: Date.now(),
      pausedAt: null,
    }
    timerRef.current = updated
    saveTimer(updated)
    setIsPaused(false)
    startTick()
  }, [startTick])

  const stop = useCallback((): number => {
    const t = timerRef.current
    if (!t) return 0
    const totalMs = getElapsed(t)
    const minutes = Math.max(1, Math.round(totalMs / 60000))
    timerRef.current = null
    saveTimer(null)
    setIsActive(false)
    setIsPaused(false)
    setDisplayMs(0)
    clearTick()
    return minutes
  }, [clearTick])

  const discard = useCallback(() => {
    timerRef.current = null
    saveTimer(null)
    setIsActive(false)
    setIsPaused(false)
    setDisplayMs(0)
    clearTick()
  }, [clearTick])

  return {
    isActive,
    isPaused,
    isRunning: isActive && !isPaused,
    displayMs,
    gameId: timerRef.current?.gameId ?? null,
    groupId: timerRef.current?.groupId ?? null,
    start,
    pause,
    resume,
    stop,
    discard,
  }
}

export { formatDuration, formatDurationMinutes } from './duration'
