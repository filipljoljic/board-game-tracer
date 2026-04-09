# PRD: Play Timer / Session Duration

## Overview

Add the ability to track how long board game sessions take — both total session duration and optionally per-player turn time. This gives users insight into how long games actually take with their group, helps identify slow games, and adds a fun competitive element.

## Problem

Users currently record scores and placements but have no record of how long sessions took. This means:
- No way to know which games are quick vs long for planning game nights
- No historical data on average play times per game
- Missing a key stat that the board game community cares about (BG Stats' most-loved feature)

## Goals

- Let users track session duration with minimal friction
- Show duration stats in session history, game details, and statistics
- Keep the UX simple — timing should enhance the experience, not interrupt it

## Non-Goals (for now)

- Per-player turn timer (chess clock style) — complex, niche use case, consider later
- Multi-device sync timer — overkill for v1
- Time limits / countdown enforcement

---

## User Experience

### Option A: Live Timer (Recommended as primary)

A start/stop timer built into the session creation flow.

**Flow:**
1. User navigates to create a session, selects group + game + players (Step 1 as today)
2. User taps **"Start Game"** — timer begins, UI shows a minimal floating/sticky timer bar
3. Users play their board game (app can be backgrounded)
4. When done, user returns to the app, taps **"End Game"** — timer stops
5. User proceeds to enter scores (Step 2 as today) — duration is auto-filled
6. Review & save (Step 3 as today) — duration shown in summary

**Timer Bar UI:**
- Sticky bar at bottom or top of screen: `⏱ 01:23:45 [Pause] [End Game]`
- Pause/resume support (for breaks, food, rules lookup)
- Persisted to localStorage so it survives page refreshes and navigation
- If user navigates away and comes back, timer is still running

### Option B: Manual Entry (Always available as fallback)

- In the session creation form, add an optional **"Duration"** field
- Input: hours and minutes picker (e.g., `1h 30m`)
- Users who forgot to start a timer or are logging a past session can enter manually
- Also useful for editing duration after saving

### Recommended: Support both A and B

The live timer is the ideal UX, but manual entry is essential for logging past games or when someone forgets to start the timer.

---

## Data Model Changes

### Prisma Schema

Add to the `Session` model:

```prisma
model Session {
  // ... existing fields
  durationMinutes  Int?        // Total duration in minutes (null = not tracked)
  startedAt        DateTime?   // When the timer was started (null = manual entry)
  endedAt          DateTime?   // When the timer was stopped (null = manual entry)
}
```

**Why nullable:** Duration tracking is optional — existing sessions won't have it, and users may choose not to track time.

**Why store both timestamps AND minutes:** `startedAt`/`endedAt` give precise data, `durationMinutes` is the rounded/edited value users actually see (they may adjust after pauses).

---

## API Changes

### POST /api/sessions (update)

Accept new optional fields in the request body:

```typescript
{
  // ... existing fields
  durationMinutes?: number    // Manual or calculated duration
  startedAt?: string          // ISO datetime
  endedAt?: string            // ISO datetime
}
```

### GET /api/sessions (update)

Include `durationMinutes`, `startedAt`, `endedAt` in response.

### GET /api/statistics/[userId] (update)

Add to response:

```typescript
{
  // ... existing fields
  averageDuration: number | null       // Average across all sessions (minutes)
  gamesData: [{
    // ... existing fields
    avgDuration: number | null         // Average duration per game
  }]
}
```

---

## UI Changes

### 1. Session Creation Form (`create-session-form.tsx`)

**Step 1 — After selecting group, game, players:**
- Add a **"Start Timer"** button (prominent, primary color)
- Add a **"Skip Timer"** link below (for manual/past entries)
- If skipped, show a `Duration (optional)` input: two dropdowns — hours (0-12) and minutes (0, 5, 10, 15... 55)

**Active Timer State:**
- Floating/sticky bar appears: `⏱ 01:23:45 [Pause] [End Game]`
- Timer persists across steps (visible during score entry too)
- "End Game" stops the timer and auto-fills duration

**Step 3 — Review:**
- Show duration in the review summary: `Duration: 1h 30m`
- Allow manual edit before saving

### 2. Session Detail Page (`app/sessions/[sessionId]/page.tsx`)

- Display duration below the date: `📅 April 9, 2026 · ⏱ 1h 30m`
- If no duration tracked, don't show anything (graceful fallback)

### 3. Session History (`components/group-history.tsx`)

- Show duration as a subtle badge next to each session: `Catan · 1h 45m · Winner: Filip`

### 4. Statistics Page

**New stat card:**
- **"Avg Game Time"** card alongside existing Total Games, Wins, Win Rate, Last Place

**Games chart enhancement:**
- Add average duration per game (as a label or additional data point)

### 5. Game-Level Stats (future consideration)

- On game pages, show: "Average play time with your group: 1h 20m"
- Compare to BGG's listed play time if integrated later

---

## Timer Implementation (Client-Side)

### State Management

```typescript
// Stored in localStorage for persistence
interface TimerState {
  isRunning: boolean
  startedAt: string          // ISO datetime when first started
  elapsed: number            // Milliseconds elapsed (accounts for pauses)
  pausedAt: string | null    // ISO datetime when paused
  gameId: string             // Associate timer with a session-in-progress
  groupId: string
}
```

### Key Behaviors

- **Page refresh:** Timer resumes from localStorage (calculates elapsed from timestamps)
- **Pause/Resume:** Tracks cumulative elapsed time, not just start-to-now
- **Browser close & reopen:** Timer still running (elapsed recalculated from `startedAt` + stored pauses)
- **Abandon:** If user cancels session creation, prompt "Discard timer?" and clear state
- **Multiple timers:** Only one active timer at a time. If user tries to start another, warn: "You have an active timer for [Game]. End it first?"

### Timer Component

A reusable `<SessionTimer />` component:
- Renders the floating bar
- Manages localStorage read/write
- Exposes: `start()`, `pause()`, `resume()`, `stop()` → returns `durationMinutes`
- Uses `setInterval` for display updates (1s interval)
- Displays: `HH:MM:SS` format

---

## Migration Plan

1. Add nullable columns to Session model via Prisma migration
2. Existing sessions get `null` for all duration fields — no backfill needed
3. All duration display is conditional: only show when data exists

---

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| User forgets to stop timer | Timer keeps running. On next app visit, show: "You have a running timer (5h 23m). Still playing?" with Stop/Discard options |
| Very short duration (<1 min) | Store as 1 minute minimum, display as "< 1 min" |
| Very long duration (>24h) | Allow it — marathon sessions happen. Display as "25h 10m" |
| User pauses and never resumes | On session save, if paused, use elapsed-at-pause as final duration |
| Logging a past session | Manual duration entry only, no timer |
| Timer running, app goes to background (mobile) | localStorage preserves state; recalculate on return |

---

## Success Metrics

- % of new sessions with duration tracked (target: >50% after 1 month)
- User engagement with timer vs manual entry
- Stats page visits increase (new data = more reason to check stats)

---

## Implementation Phases

### Phase 1: Foundation
- Schema migration + API updates
- Manual duration entry in session form
- Display duration on session detail + history

### Phase 2: Live Timer
- `<SessionTimer />` component with localStorage persistence
- Floating timer bar UI
- Integration into session creation flow

### Phase 3: Stats Integration
- Average duration in statistics page
- Per-game average duration
- "Avg Game Time" summary card

---

## Open Questions

1. Should we show duration publicly on leaderboards, or keep it personal/group-only?
2. Do we want a "fastest win" stat? (could be fun/competitive)
3. Should the timer be accessible from anywhere in the app (global floating button) or only within the session creation flow?

---

## References

- [BG Stats App](https://www.bgstatsapp.com/) — market leader, tracks total game time per session
- [Shared Game Timer](https://sharedgametimer.com/) — multi-device turn timer (inspiration for future per-player timing)
- [GameCreek Timer](https://apps.apple.com/us/app/board-game-timer-gamecreek/id6757408328) — clean minimal timer UI that "stays out of the way"
