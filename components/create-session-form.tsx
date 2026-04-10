"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from 'sonner'
import { useImmutableSWR } from '@/lib/swr'
import { useSessionTimer, formatDuration, formatDurationMinutes } from '@/lib/use-session-timer'
import { SessionTimerBar } from '@/components/session-timer-bar'
import { Timer, Clock } from 'lucide-react'

type Game = { id: string; name: string }
type Group = { id: string; name: string }
type User = { id: string; name: string }
type Template = { id: string; name: string; fields: string }

type PlayerScore = {
  userId: string
  rawScore: number
  placement: number
  pointsAwarded: number
  scoreDetails: Record<string, number>
}

export default function CreateSessionForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSaving, setIsSaving] = useState(false)

  // Selection
  const [selectedGroupId, setSelectedGroupId] = useState<string>('')
  const [selectedGameId, setSelectedGameId] = useState<string>('')
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('none')
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([])

  // Scoring
  const [playerScores, setPlayerScores] = useState<Record<string, PlayerScore>>({})

  // Duration tracking
  const timer = useSessionTimer()
  const [durationHours, setDurationHours] = useState(0)
  const [durationMinutes, setDurationMinutes] = useState(0)
  const [timerDuration, setTimerDuration] = useState<number | null>(null) // set when timer is stopped
  const [useManualDuration, setUseManualDuration] = useState(false)
  
  // Fetch initial data with SWR - games rarely change so use immutable
  const { data: games = [] } = useImmutableSWR<Game[]>('/api/games')
  const { data: groups = [] } = useSWR<Group[]>('/api/groups')
  
  // Conditionally fetch members and templates when selections change
  const { data: groupMembers = [] } = useSWR<User[]>(
    selectedGroupId ? `/api/groups/${selectedGroupId}/members` : null
  )
  
  const { data: templates = [] } = useImmutableSWR<Template[]>(
    selectedGameId ? `/api/games/${selectedGameId}/templates` : null
  )
  
  // Auto-select first template when templates load
  useEffect(() => {
    if (templates.length > 0 && selectedTemplateId === 'none' && selectedGameId) {
      setSelectedTemplateId(templates[0].id)
    }
  }, [templates, selectedGameId, selectedTemplateId])

  const handleStartScoring = () => {
    // Initialize scores
    const initialScores: Record<string, PlayerScore> = {}
    selectedPlayerIds.forEach(id => {
      initialScores[id] = {
        userId: id,
        rawScore: 0,
        placement: 0,
        pointsAwarded: 0,
        scoreDetails: {}
      }
    })
    setPlayerScores(initialScores)
    setStep(2)
  }

  const calculateScores = () => {
    // Map, sort, and assign in one pass (immutable)
    const count = selectedPlayerIds.length
    const sortedPlayers = selectedPlayerIds
      .map(id => ({ ...playerScores[id] }))
      .toSorted((a, b) => b.rawScore - a.rawScore)
      .map((p, index) => ({
        ...p,
        placement: index + 1,
        pointsAwarded: count - index // 5, 4, 3, 2, 1 pattern
      }))
    
    // Update state
    const newScores = { ...playerScores }
    sortedPlayers.forEach(p => {
      newScores[p.userId] = p
    })
    setPlayerScores(newScores)
    setStep(3)
  }

  const getFinalDuration = (): number | null => {
    if (timerDuration != null) return timerDuration
    if (useManualDuration) {
      const total = durationHours * 60 + durationMinutes
      return total > 0 ? total : null
    }
    return null
  }

  const handleTimerStop = (minutes: number) => {
    setTimerDuration(minutes)
  }

  const handleSave = async () => {
    if (isSaving) return

    // If timer is still running, stop it
    if (timer.isActive && timerDuration == null) {
      const minutes = timer.stop()
      setTimerDuration(minutes)
    }

    setIsSaving(true)
    const finalDuration = getFinalDuration()
    const payload = {
      groupId: selectedGroupId,
      gameId: selectedGameId,
      templateId: selectedTemplateId === 'none' ? null : selectedTemplateId,
      playedAt: new Date().toISOString(),
      durationMinutes: finalDuration,
      players: Object.values(playerScores)
    }

    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        const data = await res.json()
        toast.success('Session saved successfully')

        // Show achievement toasts
        if (data.newAchievements) {
          const allNew = Object.values(data.newAchievements).flat() as { id: string; name: string; description: string }[]
          for (const achievement of allNew) {
            setTimeout(() => {
              toast('Achievement Unlocked!', {
                description: `${achievement.name} — ${achievement.description}`,
                duration: 8000,
                action: {
                  label: 'View Profile',
                  onClick: () => router.push(`/players/${Object.keys(data.newAchievements)[0]}`),
                },
              })
            }, 500)
          }

          // Mark achievements as seen
          const userId = Object.keys(data.newAchievements)[0]
          if (userId) {
            fetch(`/api/players/${userId}/achievements/seen`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ achievementIds: allNew.map(a => a.id) }),
            }).catch(() => {}) // fire and forget
          }
        }

        router.push(`/groups/${selectedGroupId}`)
      } else {
        toast.error('Failed to save session', {
          description: 'Please check your input and try again'
        })
      }
    } catch {
      toast.error('Failed to save session', {
        description: 'An unexpected error occurred'
      })
    } finally {
      setIsSaving(false)
    }
  }

  const getTemplateFields = () => {
    if (selectedTemplateId === 'none') return []
    const temp = templates.find(t => t.id === selectedTemplateId)
    if (!temp) return []
    try {
      return JSON.parse(temp.fields) as { key: string; label: string; type: string }[]
    } catch {
      return []
    }
  }

  const updateScoreDetail = (userId: string, key: string, value: number) => {
    setPlayerScores(prev => {
      const userScore = { ...prev[userId] }
      userScore.scoreDetails = { ...userScore.scoreDetails, [key]: value }
      
      // Recalculate raw score if using template
      const fields = getTemplateFields()
      let total = 0
      fields.forEach(f => {
        total += (userScore.scoreDetails[f.key] || 0)
      })
      userScore.rawScore = total
      
      return { ...prev, [userId]: userScore }
    })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-0 pb-16">
      {step === 1 && (
        <Card>
          <CardHeader><CardTitle>Session Setup</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Group</Label>
              <Select onValueChange={setSelectedGroupId} value={selectedGroupId}>
                <SelectTrigger><SelectValue placeholder="Select group" /></SelectTrigger>
                <SelectContent>
                  {groups.map(g => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Game</Label>
              <Select onValueChange={setSelectedGameId} value={selectedGameId}>
                <SelectTrigger><SelectValue placeholder="Select game" /></SelectTrigger>
                <SelectContent>
                  {games.map(g => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {templates.length > 0 && (
              <div>
                <Label>Template</Label>
                <Select onValueChange={setSelectedTemplateId} value={selectedTemplateId}>
                  <SelectTrigger><SelectValue placeholder="Select template" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Raw Score)</SelectItem>
                    {templates.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedGroupId && (
              <div>
                <Label>Players</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {groupMembers.map(user => (
                    <div key={user.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={user.id} 
                        checked={selectedPlayerIds.includes(user.id)}
                        onCheckedChange={(checked) => {
                          if (checked) setSelectedPlayerIds([...selectedPlayerIds, user.id])
                          else setSelectedPlayerIds(selectedPlayerIds.filter(id => id !== user.id))
                        }}
                      />
                      <label htmlFor={user.id}>{user.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Duration tracking */}
            {selectedGroupId && selectedGameId && selectedPlayerIds.length > 0 && (
              <div className="border-t pt-4 space-y-3">
                <Label className="flex items-center gap-2"><Timer className="h-4 w-4" /> Session Timer</Label>
                {!timer.isActive && !useManualDuration && timerDuration == null && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => timer.start(selectedGameId, selectedGroupId)}
                    >
                      <Timer className="h-4 w-4 mr-2" /> Start Timer
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="flex-1"
                      onClick={() => setUseManualDuration(true)}
                    >
                      <Clock className="h-4 w-4 mr-2" /> Enter Manually
                    </Button>
                  </div>
                )}
                {timer.isActive && (
                  <p className="text-sm text-muted-foreground">Timer is running — it will show at the bottom of the screen. You can enter scores while it runs.</p>
                )}
                {timerDuration != null && (
                  <p className="text-sm font-medium">Duration: {formatDurationMinutes(timerDuration)}</p>
                )}
                {useManualDuration && (
                  <div className="flex items-center gap-2">
                    <Select value={String(durationHours)} onValueChange={(v) => setDurationHours(Number(v))}>
                      <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 13 }, (_, i) => (
                          <SelectItem key={i} value={String(i)}>{i}h</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={String(durationMinutes)} onValueChange={(v) => setDurationMinutes(Number(v))}>
                      <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(m => (
                          <SelectItem key={m} value={String(m)}>{m}m</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setUseManualDuration(false)}>Cancel</Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              disabled={!selectedGroupId || !selectedGameId || selectedPlayerIds.length === 0}
              onClick={handleStartScoring}
            >
              Next: Enter Scores
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader><CardTitle>Enter Scores</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {selectedPlayerIds.map(userId => {
              const user = groupMembers.find(u => u.id === userId)
              const fields = getTemplateFields()
              
              return (
                <div key={userId} className="border p-4 rounded">
                  <h3 className="font-bold mb-2">{user?.name}</h3>
                  {fields.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {fields.map(f => (
                        <div key={f.key}>
                          <Label>{f.label}</Label>
                          <Input 
                            type="number" 
                            onChange={(e) => updateScoreDetail(userId, f.key, Number(e.target.value))}
                          />
                        </div>
                      ))}
                      <div className="col-span-1 md:col-span-2 mt-2 font-bold">
                        Total: {playerScores[userId]?.rawScore || 0}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Label>Raw Score</Label>
                      <Input 
                        type="number"
                        value={playerScores[userId]?.rawScore || ''}
                        onChange={(e) => setPlayerScores(prev => ({
                          ...prev,
                          [userId]: { ...prev[userId], rawScore: Number(e.target.value) }
                        }))}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
            <Button variant="outline" onClick={() => setStep(1)} className="w-full sm:w-auto">Back</Button>
            <Button onClick={calculateScores} className="w-full sm:w-auto">Next: Review & Save</Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Review Results</CardTitle>
            {(timerDuration != null || (useManualDuration && (durationHours > 0 || durationMinutes > 0))) && (
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Duration: {formatDurationMinutes(timerDuration ?? (durationHours * 60 + durationMinutes))}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
              <Table className="min-w-[500px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Raw Score</TableHead>
                    <TableHead>Placement</TableHead>
                    <TableHead>League Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.values(playerScores)
                    .sort((a, b) => a.placement - b.placement)
                    .map(score => {
                      const user = groupMembers.find(u => u.id === score.userId)
                      return (
                        <TableRow key={score.userId}>
                          <TableCell>{user?.name}</TableCell>
                          <TableCell>{score.rawScore}</TableCell>
                          <TableCell>
                            <Input 
                              type="number" 
                              className="w-16" 
                              value={score.placement}
                              onChange={(e) => setPlayerScores(prev => ({
                                ...prev,
                                [score.userId]: { ...prev[score.userId], placement: Number(e.target.value) }
                              }))}
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="number" 
                              className="w-16" 
                              value={score.pointsAwarded}
                              onChange={(e) => setPlayerScores(prev => ({
                                ...prev,
                                [score.userId]: { ...prev[score.userId], pointsAwarded: Number(e.target.value) }
                              }))}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
            <Button variant="outline" onClick={() => setStep(2)} disabled={isSaving} className="w-full sm:w-auto">Back</Button>
            <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
              {isSaving ? 'Saving...' : 'Save Session'}
            </Button>
          </CardFooter>
        </Card>
      )}
      <SessionTimerBar onStop={handleTimerStop} />
    </div>
  )
}

