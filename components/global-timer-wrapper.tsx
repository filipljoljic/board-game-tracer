"use client"

import dynamic from "next/dynamic"

const GlobalTimerBar = dynamic(
  () => import("@/components/session-timer-bar").then(mod => ({ default: mod.GlobalTimerBar })),
  { ssr: false }
)

export function GlobalTimerWrapper() {
  return <GlobalTimerBar />
}
